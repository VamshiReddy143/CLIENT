const marketController = require('./marketController');
const marketModel = require('../models/marketModelWrapper'); // Use the new wrapper model
const db=require('../utils/db');





exports.getMarketsByOwner = (req, res) => {
  const ownerId = req.query.ownerId;

  if (!ownerId) {
    return res.status(400).json({ message: 'ownerId query parameter is required' });
  }

  const ownerIdInt = parseInt(ownerId, 10);
  if (isNaN(ownerIdInt)) {
    return res.status(400).json({ message: 'Invalid ownerId' });
  }

  const query = `
    SELECT 
      id,
      marketName,
      location,
      price,
      size,
      type,
      status,
      images
    FROM markets
    WHERE owner_id = ? AND status = 'available'
  `;

  db.query(query, [ownerIdInt], (err, results) => {
    if (err) {
      console.error('Error fetching approved markets:', err);
      return res.status(500).json({ message: 'Error fetching approved markets', error: err.message });
    }

    console.log('Fetched approved markets for ownerId', ownerIdInt, ':', results);
    res.status(200).json(results);
  });
};
exports.getAdminStats = (req, res) => {
    const userRole = req.user?.userRole;
    if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
  
    const totalListingsQuery = "SELECT COUNT(*) as count FROM markets WHERE status = 'available'";
    const totalMarketOwnersQuery = "SELECT COUNT(DISTINCT id) as count FROM users WHERE user_role = 'market_owner'";
    const totalVendorsQuery = "SELECT COUNT(DISTINCT id) as count FROM users WHERE user_role = 'vendor'";
    const totalRecentRequestsQuery = "SELECT COUNT(*) as count FROM markets WHERE status = 'pending'";
  
    Promise.all([
      new Promise((resolve, reject) => {
        db.query(totalListingsQuery, (err, result) => {
          if (err) return reject(err);
          console.log('Total Listings Result:', result);
          resolve(result[0].count);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(totalMarketOwnersQuery, (err, result) => {
          if (err) return reject(err);
          console.log('Total Market Owners Result:', result);
          resolve(result[0].count);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(totalVendorsQuery, (err, result) => {
          if (err) return reject(err);
          console.log('Total Vendors Result:', result);
          resolve(result[0].count);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(totalRecentRequestsQuery, (err, result) => {
          if (err) return reject(err);
          console.log('Total Recent Requests Result:', result);
          resolve(result[0].count);
        });
      }),
    ])
      .then(([totalListings, totalMarketOwners, totalVendors, totalRecentRequests]) => {
        console.log('Stats Response:', { totalListings, totalMarketOwners, totalVendors, totalRecentRequests });
        res.status(200).json({
          totalListings,
          totalMarketOwners,
          totalVendors,
          totalRecentRequests,
        });
      })
      .catch((err) => {
        console.error('Error fetching admin stats:', err);
        res.status(500).json({ message: 'Error fetching admin stats', error: err.message });
      });
  };




  exports.getRecentRequests = (req, res) => {
    const userRole = req.user?.userRole;
    if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
  
    const query = `
      SELECT m.id, m.ownerName, m.marketName, m.size, m.type, m.price
      FROM markets m
      WHERE m.status = 'pending'
      ORDER BY m.created_at DESC
      LIMIT 5
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching recent requests:', err);
        return res.status(500).json({ message: 'Error fetching recent requests', error: err.message });
      }
  
      const formattedResults = results.map((market) => ({
        requestId: `#${market.id.toString().padStart(6, '0')}`,
        marketOwner: market.ownerName,
        listingName: market.marketName,
        spaceSize: `${market.size} sq. ft.`,
        propertyType: market.type,
        rentalPrice: `$${market.price.toLocaleString()}`,
      }));
  
      res.status(200).json(formattedResults);
    });
  };
  
  exports.getActiveListings = (req, res) => {
    const userRole = req.user?.userRole;
    if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
  
    const query = `
      SELECT m.id, m.marketName, m.location, m.price, m.rating, m.images
      FROM markets m
      WHERE m.status = 'available'
      ORDER BY m.created_at DESC
      LIMIT 5
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching active listings:', err);
        return res.status(500).json({ message: 'Error fetching active listings', error: err.message });
      }
  
      const formattedResults = results.map((market) => {
        const parseJSON = (value, defaultValue) => {
          try {
            return value ? JSON.parse(value) : defaultValue;
          } catch (err) {
            console.error(`Error parsing JSON for market ${market.id}:`, err);
            return defaultValue;
          }
        };
  
        return {
          id: market.id,
          marketName: market.marketName,
          location: market.location,
          price: market.price,
          rating: market.rating || 0,
          images: parseJSON(market.images, []),
        };
      });
  
      res.status(200).json(formattedResults);
    });
  };

exports.createMarket = (req, res) => {
    console.log('Request body in wrapper:', req.body);
    const { 
      ownerName, email, phone, marketName, location, city, price, size, type, services, 
      status, rating, featured, images, videos, highlights 
    } = req.body;
    const ownerId = req.user?.id;
    const userRole = req.user?.userRole;
  
    if (!ownerId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    const marketData = {
      owner_id: ownerId,
      ownerName: ownerName || req.user.name,
      email: email || req.user.email,
      phone,
      marketName,
      location: city ? `${location}, ${city}` : location,
      price: parseInt(price, 10) || 0,
      size: parseInt(size, 10) || 0,
      type,
      videos: videos || [],
      services: services ? (Array.isArray(services) ? services : JSON.parse(services)) : [],
      status: userRole === 'admin' ? (status || 'available') : 'pending',
      rating: rating ? parseInt(rating, 10) : null,
      featured: featured === true || featured === 'true',
      images: images || [],
      highlights: highlights || null,
    };
  
    console.log('Market data to DB in wrapper:', marketData);
  
    marketModel.create(marketData, (err, result) => {
      if (err) {
        console.error('Error in createMarket (wrapper):', err);
        return res.status(500).json({ message: 'Error creating market', error: err.message });
      }
      res.status(201).json({ message: 'Market submitted for approval', marketId: result.insertId });
    });
  };

// Wrapper for getMarketById
exports.getMarketById = (req, res) => {
  const marketId = req.params.id;
  const userId = req.user?.id;
  const userRole = req.user?.userRole;

  if (!userId || !userRole) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  marketModel.findById(marketId, (err, market) => {
    if (err) {
      console.error('Error in getMarketById (wrapper):', err);
      return res.status(500).json({ message: 'Error fetching market', error: err.message });
    }
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    // Authorization: Only the owner or admin can access the market
    if (userRole === 'market_owner' && market.owner_id !== userId) {
      return res.status(403).json({ message: 'Access denied. You can only view your own markets.' });
    }

    // Map the market data to the expected frontend format
    const marketData = {
      id: market.id,
      owner_id: market.owner_id,
      ownerName: market.ownerName,
      email: market.email,
      phone: market.phone,
      marketName: market.marketName,
      location: market.location,
      city: market.city || '', // Extract city if stored separately in location
      price: market.price,
      rentalPrice: market.price, // Alias for frontend compatibility
      size: market.size,
      spaceSize: market.size, // Alias for frontend compatibility
      type: market.type,
      propertyType: market.type, // Alias for frontend compatibility
      services: market.services ? JSON.parse(market.services) : [],
      images: market.images ? JSON.parse(market.images) : [],
      videos: market.videos ? JSON.parse(market.videos) : [],
      status: market.status,
      rating: market.rating || null,
      featured: market.featured === 1 || market.featured === true,
      highlights: market.highlights ? JSON.parse(market.highlights) : {
        spaceHighlights: [],
        heading2: [],
        heading3: [],
        heading4: [],
      },
    };

    res.status(200).json(marketData);
  });
};

// Wrapper for getAllMarkets
exports.getAllMarkets = (req, res) => {
  const { type, sizeMin, sizeMax, location, priceMin, priceMax, page = 1, limit = 5, status, sort } = req.query;

  const filters = {
    type,
    sizeMin: sizeMin ? parseInt(sizeMin) : undefined,
    sizeMax: sizeMax ? parseInt(sizeMax) : undefined,
    location,
    priceMin: priceMin ? parseInt(priceMin) : undefined,
    priceMax: priceMax ? parseInt(priceMax) : undefined,
    status,
    sort, // Ensure sort is included in the filters
  };

  console.log('Fetching markets with filters (wrapper):', filters, 'page:', page, 'limit:', limit);
  marketModel.findAll(filters, parseInt(page), parseInt(limit), (err, markets) => {
    if (err) {
      console.error('Error in getAllMarkets (wrapper):', err);
      return res.status(500).json({ message: 'Error fetching markets', error: err.message });
    }
    console.log('Markets fetched (wrapper):', markets);
    res.status(200).json(markets);
  });
};

// Wrapper for updateMarketStatus
exports.updateMarketStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userRole = req.user?.userRole;

  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  if (!['pending', 'approved', 'rejected', 'available'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  marketModel.updateStatus(id, status, (err, result) => {
    if (err) {
      console.error('Error in updateMarketStatus (wrapper):', err);
      return res.status(500).json({ message: 'Error updating market status', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Market not found' });
    }
    console.log(`Market ${id} status updated to ${status} (wrapper)`);
    res.status(200).json({ message: 'Market status updated successfully' });
  });
};

// Wrapper for updateMarket
exports.updateMarket = (req, res) => {
  const marketId = req.params.id;
  console.log('Update request body in wrapper:', req.body);
  const { 
    ownerName, email, phone, marketName, location, price, size, type, services, 
    status, rating, featured, images, videos, highlights 
  } = req.body;

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

  marketModel.update(marketId, marketData, (err, result) => {
    if (err) {
      console.error('Error in updateMarket (wrapper):', err);
      return res.status(500).json({ message: 'Error updating market', error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Market not found' });
    res.json({ message: 'Market updated successfully' });
  });
};

// Wrapper for deleteMarket
exports.deleteMarket = (req, res) => {
  const marketId = req.params.id;
  marketModel.delete(marketId, (err, result) => {
    if (err) {
      console.error('Error in deleteMarket (wrapper):', err);
      return res.status(500).json({ message: 'Error deleting market' });
    }
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Market not found' });
    res.json({ message: 'Market deleted successfully' });
  });
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
        type,
        COALESCE(images, '[]') AS images,
        COALESCE(services, '[]') AS services,
        COALESCE(videos, '[]') AS videos,
        COALESCE(highlights, '{}') AS highlights
      FROM markets
      WHERE owner_id = ?
      ORDER BY created_at DESC
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
