const express = require('express');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Forgot Password route
router.post('/forgot-password', userController.forgotPassword);

// Reset Password route
router.post('/reset-password', userController.resetPassword);

// Get user by ID
router.get('/user/:id', authenticateJWT, userController.getUserById);

// Update user by ID
router.put('/user/:id', authenticateJWT, userController.updateUser);

// Get all users
router.get('/users', authenticateJWT, userController.getAllUsers);

// Delete user by ID
router.delete('/user/:id', authenticateJWT, userController.deleteUser);

// Update user password by ID
router.put('/user/:id/password', authenticateJWT, userController.updatePassword);

// At the bottom of your router file
router.get('/user/:id/listings', authenticateJWT, userController.getVendorListings);

// New routes for counts
router.get('/market/market-owners/count', authenticateJWT, userController.getMarketOwnersCount);
router.get('/market/vendors/count', authenticateJWT, userController.getVendorsCount);

module.exports = router;