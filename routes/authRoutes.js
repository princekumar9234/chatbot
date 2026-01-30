const express = require('express');
const router = express.Router();
const { getLogin, getRegister, login, register, logout } = require('../controllers/authController');

router.get('/login', getLogin);
router.post('/login', login);
router.get('/register', getRegister);
router.post('/register', register);
router.get('/logout', logout);

// Google Login Routes
const passport = require('passport');

router.get('/google', (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        // Fallback to Mock Login if keys are missing (Smart Fallback)
        console.log('⚠️ Google keys not found. Using Mock Login for demonstration.');
        req.params.provider = 'google';
        return require('../controllers/authController').mockSocialLogin(req, res);
    }
    passport.authenticate('google', { scope: ['profile'] })(req, res, next);
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Successful authentication
    req.session.user = req.user; // Ensure our manual session user is also set if mixed usage
    res.redirect('/');
  }
);

router.get('/google/error-no-keys', (req, res) => {
    res.render('login', { title: 'Login', error: 'Google Client ID missing in server config (.env)' });
});

router.post('/update-profile', require('../controllers/authController').updateProfile);

// Mock Social Login Routes (GitHub/LinkedIn still mock for now)
router.get('/github', (req, res) => { req.params.provider = 'github'; require('../controllers/authController').mockSocialLogin(req, res); });
router.get('/linkedin', (req, res) => { req.params.provider = 'linkedin'; require('../controllers/authController').mockSocialLogin(req, res); });

module.exports = router;
