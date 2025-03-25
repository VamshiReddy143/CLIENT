const express = require('express');
const marketController = require('../controllers/marketControllerWrapper'); // Use the wrapper controller
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();
const db = require("../utils/db")

// Create market
router.post('/market', authenticateJWT, marketController.createMarket);
router.get('/markets/owner', authenticateJWT, marketController.ownermarkets);
// Get market by ID
router.get('/market/:id',authenticateJWT, marketController.getMarketById);
router.get('/markets/:id',authenticateJWT, marketController.getMarketById);

// Get all markets
router.get('/markets', authenticateJWT, marketController.getAllMarkets);

router.get('/marketee', authenticateJWT, marketController.getMarketsByOwner);

// Update market
router.put('/market/:id', authenticateJWT, marketController.updateMarket);

// Delete market
router.delete('/market/:id', authenticateJWT, marketController.deleteMarket);



// Update market status
router.put('/markets/:id/status', authenticateJWT, marketController.updateMarketStatus)

router.get('/admin/stats', authenticateJWT, marketController.getAdminStats);
router.get('/admin/recent-requests', authenticateJWT, marketController.getRecentRequests);
router.get('/admin/active-listings', authenticateJWT, marketController.getActiveListings);







module.exports = router;