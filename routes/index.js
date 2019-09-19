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

// Save Shader
router.post('/editor/save', (req, res, next) => {
  const sliders = req.body;
  
  User.findOne({ email: req.user.email }).then(user => {
    
    User.updateOne(
      { email: user.email },
      { $push: { shaders: sliders } }
    )
      .then(user => {
        req.flash(
          'success_msg',
          'Shader saved'
          );
        res.redirect('/editor');
    });
  });
});

// Delete
router.post('/editor/delete/:name', (req, res, next) => {
  let name = req.params.name;
  let user = User.findById(req.user._id);
  user.update({_id: req.user._id}, {$pull: {shaders: {name: name}}}, {upsert: true},function(err, main) {
        res.redirect('/editor');
  });
});

module.exports = router;
