const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//===============CONFIGS===================CONNECTS==============
// Setting app to hold express server
const app = express();
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB config
const db = require('./config/keys').mongoURI;
// // DB Connection
mongoose
  .connect(db)
  .then(() => console.log(`Logged into MLab URI = ${db}`))
  .catch(err => console.log('Error Mongo : ' + err));
// ================= PASSPORT MIDDLEWARE ========================
// app.use(passport.initialize());
// Passport Config - JWT strategy
// require('./config/passport')(passport);
//======================ROUTERS================================
const users = require('./routes/api/users');
//
// Need middleware for router use
app.use('/api/users', users);

//=============== Server STATIC ASSETS if in production ========
// if (process.env.NODE_ENV === 'production') {
//   // Set a static folder and point to client side, build as
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// Start Ma
app.get('/', (req, res) => {
  res.send('Baanda Ma ');
});

// Starting Node Server in Dev
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Baand server (power by ma-babi) running on port ${port}`);
});
