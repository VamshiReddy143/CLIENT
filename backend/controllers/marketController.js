const marketModel = require('../models/marketModel');
const userModel = require('../models/userModel');

// Create a new market (set status to 'pending' by default for market owners)
exports.createMarket = async (req, res) => {
  console.log('Request body:', req.body);
  const { 
    ownerName, email, phone, marketName, location, price, size, type, services, 
    status, rating, featured, images, videos, highlights 
  } = req.body;
  const ownerId = req.user?.id; // Get owner_id from JWT
  const userRole = req.user?.userRole; // Get user role from JWT

  if (!ownerId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const marketData = {
      owner_id: ownerId,
      ownerName: ownerName || req.user.name,
      email: email || req.user.email,
      phone,
      marketName,
      location,
      price: parseInt(price, 10) || 0,
      size: parseInt(size, 10) || 0,
      type,
      videos: Array.isArray(videos) ? videos : [],
      services: Array.isArray(services) ? services : [],
      status: userRole === 'admin' ? (status || 'available') : 'pending', // Admins can set status, others get 'pending'
      rating: rating ? parseInt(rating, 10) : null,
      featured: featured === true || featured === 'true',
      images: Array.isArray(images) ? images : [],
      highlights: highlights || null,
    };
    console.log('Market data to DB:', marketData);

    const result = await marketModel.create(marketData);
    res.status(201).json({ message: 'Market submitted for approval', marketId: result.insertId });
  } catch (err) {
    console.error('Error in createMarket:', err);
    res.status(500).json({ message: 'Error creating market', error: err.message });
  }
};

// Get market by ID
exports.getMarketById = async (req, res) => {
  const marketId = req.params.id;
  try {
    const market = await marketModel.findById(marketId);
    if (!market) return res.status(404).json({ message: 'Market not found' });
    res.json(market);
  } catch (err) {
    console.error('Error in getMarketById:', err);
    res.status(500).json({ message: 'Error fetching market' });
  }
};

// Get all markets with filters (including status for admin)const marketModel = require('../models/marketModel');



console.log('Imported marketModel in marketController.js:', marketModel);

exports.getAllMarkets = (req, res) => {
  const { type, sizeMin, sizeMax, location, priceMin, priceMax, page = 1, limit = 5, status } = req.query;

  const filters = {
    type,
    sizeMin: sizeMin ? parseInt(sizeMin) : undefined,
    sizeMax: sizeMax ? parseInt(sizeMax) : undefined,
    location,
    priceMin: priceMin ? parseInt(priceMin) : undefined,
    priceMax: priceMax ? parseInt(priceMax) : undefined,
    status, // Add status filter for admin
  };

  console.log('Fetching markets with filters:', filters, 'page:', page, 'limit:', limit);
  marketModel.findAll(filters, parseInt(page), parseInt(limit), (err, markets) => {
    if (err) {
      console.error('Error in getAllMarkets:', err);
      return res.status(500).json({ message: 'Error fetching markets', error: err.message });
    }
    console.log('Markets fetched:', markets);
    res.status(200).json(markets);
  });
};

exports.updateMarketStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  marketModel.updateStatus(id, status, (err, result) => {
    if (err) {
      console.error('Error in updateMarketStatus:', err);
      return res.status(500).json({ message: 'Error updating market status', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Market not found' });
    }
    console.log(`Market ${id} status updated to ${status}`);
    res.status(200).json({ message: 'Market status updated successfully' });
  });
};
// Update market (admins can change status)
exports.updateMarket = async (req, res) => {
  const marketId = req.params.id;
  console.log('Update request body:', req.body);
  const { 
    ownerName, email, phone, marketName, location, price, size, type, services, 
    status, rating, featured, images, videos, highlights 
  } = req.body;

  try {
    const marketData = {
      ownerName,
      email,
      phone,
      marketName,
      location,
      price: parseInt(price, 10) || 0,
      size: parseInt(size, 10) || 0,
      type,
      videos: Array.isArray(videos) ? videos : [],
      services: Array.isArray(services) ? services : [],
      status: status || 'available',
      rating: rating ? parseInt(rating, 10) : null,
      featured: featured === true || featured === 'true',
      images: Array.isArray(images) ? images : [],
      highlights: highlights || null,
    };

    const result = await marketModel.update(marketId, marketData);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Market not found' });
    res.json({ message: 'Market updated successfully' });
  } catch (err) {
    console.error('Error in updateMarket:', err);
    res.status(500).json({ message: 'Error updating market', error: err.message });
  }
};

// Delete market
exports.deleteMarket = async (req, res) => {
  const marketId = req.params.id;
  try {
    const result = await marketModel.delete(marketId);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Market not found' });
    res.json({ message: 'Market deleted successfully' });
  } catch (err) {
    console.error('Error in deleteMarket:', err);
    res.status(500).json({ message: 'Error deleting market' });
  }
};


exports.ownermarkets=(req,res)=> {
  try {
    const ownerId = req.user?.id;
    const userRole = req.user?.userRole;

    console.log('Fetching markets for ownerId:', ownerId, 'with role:', userRole);

    if (userRole !== 'market_owner') {
      return res.status(403).json({ message: 'Access denied. Market owner only.' });
    }

    const query = `
      SELECT 
        id,
        marketName,
        size AS spaceSize,
        price AS rentalPrice,
        type AS propertyType,
        status,
        COALESCE(images, '[]') AS images,
        COALESCE(services, '[]') AS services,
        COALESCE(videos, '[]') AS videos,
        COALESCE(highlights, '{}') AS highlights
      FROM markets
      WHERE owner_id = ?
    `;
    db.query(query, [ownerId], (err, results) => {
      if (err) {
        console.error('Error fetching owner markets:', err);
        return res.status(500).json({ message: 'Error fetching markets', error: err.message });
      }

      console.log('Raw query results:', results);

      if (results.length === 0) {
        console.log('No markets found for ownerId:', ownerId);
        return res.status(200).json([]);
      }

      const formattedResults = results.map((market) => ({
        id: market.id,
        marketName: market.marketName,
        size: market.spaceSize,
        price: market.rentalPrice,
        type: market.propertyType,
        status: market.status,
        images: JSON.parse(market.images),
        services: JSON.parse(market.services),
        videos: JSON.parse(market.videos),
        highlights: JSON.parse(market.highlights),
      }));

      console.log('Formatted results:', formattedResults);
      res.status(200).json(formattedResults);
    });
  } catch (error) {
    console.error('Error fetching owner markets:', error);
    res.status(500).json({ message: 'Failed to fetch markets', error: error.message });
  }
};