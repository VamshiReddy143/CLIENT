const express = require('express');
const requestController = require('../controllers/requestController');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

// Create request
router.post('/request', authenticateJWT, requestController.createRequest);

// Get all requests
router.get('/requests', authenticateJWT, requestController.getAllRequests);

// Get request by ID
router.get('/request/:id', authenticateJWT, requestController.getRequestById);

// Update request
router.put('/request/:id', authenticateJWT, requestController.updateRequest);

// Delete request
router.delete('/request/:id', authenticateJWT, requestController.deleteRequest);

module.exports = router;