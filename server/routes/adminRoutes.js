const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/admin-check', authMiddleware, adminMiddleware, (req, res) => {
    res.set('Cache-Control', 'no-store');
  res.json({ message: `Hello Admin ${req.user.username}!` });
});

module.exports = router;
