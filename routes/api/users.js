const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs'); // For encrypting password
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport'); // Required for protected routes

// Load Input Validation
const validateRegisterInput = require('../../validation/common/register');
const validateLoginInput = require('../../validation/common/login');

// ===============  API in this module are ==================================
// @register   Registers the user and sends an email for verification
// @verify     Upon click on the email, it verify and redirects to login page
// @login      Check loging and then returns JWT token
// ==========================================================================

//const nodemailer = require('nodemailer');
const confirmMail = require('../../utils/confirmEmail');

// Load user model
const User = require('../../models/common/User');

// @route   GET api/users/test
// @desc    Test post routes
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'users works' });
});

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validations
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatargen = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', // Rating ..
        d: 'mm' // Defaults to empty face icon
      });

      let rand = Math.floor(Math.random() * 1000);
      let date = new Date();
      let confirmby = date.setDate(date.getDate() + 10); //Conform by 10 days. This needs to be in config file

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatargen,
        password: req.body.password,
        confirmCode: rand,
        confirmBy: confirmby
      });
      // This is used to create a hash of the password before storing.
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err; // Error while generating salt
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err; // Error while generating hash
          newUser.password = hash;
          // save it in DB
          newUser
            .save()
            .then(user => {
              if (confirmMail(req, rand)) {
                // good
                res.json({
                  user: user,
                  message: 'Please confirm email within two days from now.'
                });
              } else {
                console.log(
                  'confirm email-send failed ... for email = ' + req.body.email
                );
              }
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/verify
// @desc    Register user
// @access  Public
router.get('/verify', (req, res) => {
  let emailIn = req.query.email;
  let confirmCodeIn = req.query.id;
  console.log(
    'Return from confirm click. id = ' + confirmCodeIn + ' email: ' + emailIn
  );
  // const targetURL = req.protocol + '://' + req.get('host') + '/login';
  // res.send(targetURL);
  // This needs to be in place and tested in heroku ************************
  const targetURL = 'http://localhost:3000/login';

  User.findOne({ email: emailIn })
    .then(user => {
      // console.log('user:' + JSON.stringify(user));
      let msg = '';
      if (!user.isConfirmed) {
        if (user.confirmCode == confirmCodeIn) {
          //console.log('confirm code matched : ' + confirmCodeIn);
          if (user.confirmBy > Date.now()) {
            User.findOneAndUpdate({ email: emailIn }, { isConfirmed: true })
              .then(user => {
                //console.log('updated confirmed successfully');
                res.redirect(targetURL);
              })
              .catch(err => console.log('update error'));
          } else {
            msg =
              'Confirmaton time has elasped. You can request for  re-confirmation.';
            console.log('msg : ' + msg + ' user.confirmBy:' + user.confirmBy);
          }
        } else {
          msg = 'Your confirmation code  has been tampered';
          console.log(
            'msg : ' +
              msg +
              ' user.confirmCode:' +
              user.confirmCode +
              ' confirmCodeIn:' +
              confirmCodeIn
          );
        }
      } else {
        msg = 'You are already confirmed';
        console.log('msg : ' + msg);
        res.redirect(targetURL);
      }
    })
    .catch(err => console.log('error in verify findOne :' + err));
});

// @route   POST api/users/login
// @desc    Login user & return JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validations
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find the user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      // Check password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // res.json({ msg: 'success' });
            // User Matched - develop the payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };
            if (user.isActive && user.isConfirmed) {
              // Sign Token. jwt takes in payload. Payload has user information, key and expiration time
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
            } else {
              console.log('Error: Please confirm your email');
              errors.emailConfirm =
                'Please confirm your email. Check your email box.';
              return res.status(400).json(errors);
            }
          } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        })
        .catch();
    })
    .catch();
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      isConfirmed: req.user.isConfirmed,
      isActive: req.user.isActive
    });
    //res.json(req.user);
    //res.json({ msg: 'success' });
  }
);

module.exports = router;
