const express = require('express');
const marketController = require('../controllers/marketController');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

// Create market
router.post('/market', authenticateJWT, marketController.createMarket);

// Get market by ID
router.get('/market/:id',  marketController.getMarketById);

// Get all markets
router.get('/markets',  marketController.getAllMarkets);

// Update market
router.put('/market/:id', authenticateJWT, marketController.updateMarket);

// Delete market
router.delete('/market/:id', authenticateJWT, marketController.deleteMarket);

module.exports = router;



