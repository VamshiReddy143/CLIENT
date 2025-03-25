// src/routes/admin.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/user-signups', authenticateJWT, userController.getUserSignupsByMonth);
router.get('/platform-performance', authenticateJWT, userController.getPlatformPerformance);

module.exports = router;