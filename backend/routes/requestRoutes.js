




const express = require('express');
const router = express.Router();
const requestModel = require('../models/requestModel');
const authenticateJWT = require('../middleware/authMiddleware');


router.post('/request', authenticateJWT, async (req, res) => {
  try {
    const { vendorId, vendorName, marketId, marketName, spaceSize, rentalPrice, propertyType } = req.body;

    // Use vendorId and vendorName from request body if provided, otherwise from req.user
    const finalVendorId = vendorId || req.user?.id;
    const finalVendorName = vendorName || req.user?.name;

    if (!finalVendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    const requestData = {
      vendorId: finalVendorId,
      marketId,
      vendorName: finalVendorName || 'Unknown Vendor', // Fallback if name is missing
      marketName,
      spaceSize,
      rentalPrice,
      propertyType,
    };

    const result = await requestModel.createRequest(requestData);
    res.status(201).json({ message: 'Request sent successfully', requestId: result.insertId });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Failed to send request', error: error.message });
  }
});


router.get('/requests', authenticateJWT, async (req, res) => {
  try {
    const vendorIdFromQuery = req.query.vendorId; // Get vendorId from query params
    const vendorId = vendorIdFromQuery || req.user.id; // Fallback to req.user.id if not provided
    console.log('Authenticated Vendor ID:', vendorId);

    if (!vendorId) {
      return res.status(400).json({ message: 'Vendor ID is required' });
    }

    const requests = await requestModel.fetchRequests(vendorId);
    console.log('API Response for /requests:', requests);
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
  }
});


  router.get('/owner-requests', authenticateJWT, async (req, res) => {
    try {
      const ownerId = req.user.id;
      console.log('Authenticated Owner ID:', ownerId);
      if (req.user.userRole !== 'market_owner') {
        return res.status(403).json({ message: 'Access denied: Not a market owner' });
      }
      const requests = await requestModel.fetchOwnerRequests(ownerId);
      console.log('API Response for /owner-requests:', requests);
      res.status(200).json(requests);
    } catch (error) {
      console.error('Error fetching owner requests:', error);
      res.status(500).json({ message: 'Failed to fetch owner requests', error: error.message });
    }
  });

  router.patch('/request/:id/status', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use "approved" or "rejected"' });
    }
  
    try {
      const result = await requestModel.updateRequestStatus(id, status);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Request not found' });
      }
      res.status(200).json({ message: 'Request status updated successfully' });
    } catch (error) {
      console.error('Error updating request status:', error);
      res.status(500).json({ message: 'Failed to update request status', error: error.message });
    }
  });

module.exports = router;