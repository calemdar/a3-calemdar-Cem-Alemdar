const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/authenticate');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('home'));

// Editor
router.get('/editor', ensureAuthenticated, (req, res) =>
  res.render('editor', {
    user: req.user
  })
);

module.exports = router;
