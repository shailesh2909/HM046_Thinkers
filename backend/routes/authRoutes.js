const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { session: false }), 
  (req, res) => {
    // Generate JWT for the OAuth user
    const token = require('jsonwebtoken').sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);

module.exports = router;