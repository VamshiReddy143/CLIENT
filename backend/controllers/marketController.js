// const Market = require('../models/marketModel');

// // Create a new market
// exports.createMarket = async (req, res) => {
//   const { owner, renter, location, price, size, type, content, highlights, status, rating, featured, images } = req.body;
  
//   try {
//     const newMarket = await Market.create({
//       owner, renter, location, price, size, type, content, highlights, status, rating, featured, images
//     });
//     res.status(201).json({ message: 'Market created successfully', market: newMarket });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error creating market' });
//   }
// };

// // Get market by ID
// exports.getMarketById = async (req, res) => {
//   const marketId = req.params.id;

//   try {
//     const market = await Market.findById(marketId);
//     if (!market) {
//       return res.status(404).json({ message: 'Market not found' });
//     }
//     res.json(market);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching market' });
//   }
// };

// // Get all markets
// exports.getAllMarkets = async (req, res) => {
//   try {
//     const markets = await Market.findAll();
//     res.json(markets);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching markets' });
//   }
// };

// // Update a market
// exports.updateMarket = async (req, res) => {
//   const marketId = req.params.id;
//   const { location, price, size, type, content, highlights, status, rating, featured, images } = req.body;

//   try {
//     const updatedMarket = await Market.update(marketId, {
//       location, price, size, type, content, highlights, status, rating, featured, images
//     });
//     res.json({ message: 'Market updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating market' });
//   }
// };

// // Delete a market
// exports.deleteMarket = async (req, res) => {
//   const marketId = req.params.id;

//   try {
//     await Market.delete(marketId);
//     res.json({ message: 'Market deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting market' });
//   }
// };


// backend/controllers/marketController.js
// backend/controllers/marketController.js
const marketModel = require('../models/marketModel');

exports.createMarket = async (req, res) => {
  console.log('Request body:', req.body); // Debug log
  const { 
    ownerName, email, phone, marketName, location, price, size, type, services, 
    status, rating, featured, images, videos, highlights // Add highlights here
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
      highlights: highlights || null, // Include highlights
    };
    console.log('Market data to DB:', marketData); // Debug log

    const result = await marketModel.create(marketData);
    res.status(201).json({ message: 'Market created successfully', marketId: result.insertId });
  } catch (err) {
    console.error('Error in createMarket:', err);
    res.status(500).json({ message: 'Error creating market', error: err.message });
  }
};

exports.getMarketById = async (req, res) => {
  const marketId = req.params.id;
  try {
    const market = await marketModel.findById(marketId)
    console.log("Market",market)
    if (!market) return res.status(404).json({ message: 'Market not found' });
    res.json(market);
  } catch (err) {
    console.error('Error in getMarketById:', err);
    res.status(500).json({ message: 'Error fetching market' });
  }
};

exports.getAllMarkets = async (req, res) => {
  try {
    const { type, sizeMin, sizeMax, location, priceMin, priceMax, page = 1, limit = 5 } = req.query;

    const filters = {
      type,
      sizeMin: sizeMin ? parseInt(sizeMin) : undefined,
      sizeMax: sizeMax ? parseInt(sizeMax) : undefined,
      location,
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
    };

    const markets = await marketModel.findAll(filters, parseInt(page), parseInt(limit));
    res.status(200).json(markets);
  } catch (err) {
    console.error('Error in getAllMarkets:', err);
    res.status(500).json({ message: 'Error fetching markets', error: err.message });
  }
};

exports.updateMarket = async (req, res) => {
  const marketId = req.params.id;
  console.log('Update request body:', req.body);
  const { 
    ownerName, email, phone, marketName, location, price, size, type, services, 
    status, rating, featured, images, videos, highlights // Add highlights here
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
      highlights: highlights || null, // Include highlights
    };

    const result = await marketModel.update(marketId, marketData);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Market not found' });
    res.json({ message: 'Market updated successfully' });
  } catch (err) {
    console.error('Error in updateMarket:', err);
    res.status(500).json({ message: 'Error updating market', error: err.message });
  }
};

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