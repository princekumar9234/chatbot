const express = require('express');
const { ensureAuthenticated } = require('../middlewares/auth');
const router = express.Router();

/**
 * GET /
 * Render main chatbot interface
 */
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index', {
    title: 'AI Chatbot Assistant',
    user: req.session.user
  });
});

module.exports = router;
