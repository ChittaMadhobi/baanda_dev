const express = require('express');
const router = express.Router();

// @route   GET api/post/test
// @desc    Test post routes
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'users works' });
});

module.exports = router;