const express = require('express');
const router = express.Router();

/**
 * GET /
 * Render main chatbot interface
 */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'AI Chatbot Assistant'
  });
});

module.exports = router;
