const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/logout',authMiddleware, authController.logout);
router.get('/admin-check',authMiddleware,adminMiddleware, authController.admin)
router.get('/login-check',authMiddleware,authController.checkLogin)

module.exports = router;
