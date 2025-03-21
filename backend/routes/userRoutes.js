const express = require('express');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Get user by ID
router.get('/user/:id', authenticateJWT, userController.getUserById);
// Update user by ID
router.put('/user/:id', authenticateJWT, userController.updateUser);
// Get all users
router.get('/users', authenticateJWT, userController.getAllUsers);

// Delete user by ID
router.delete('/user/:id', authenticateJWT, userController.deleteUser);
router.put('/user/:id/password', authenticateJWT, userController.updatePassword);

module.exports = router;