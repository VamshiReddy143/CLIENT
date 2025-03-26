const db = require('../utils/db');

const requestModel = {
  createRequest: (requestData) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO requests (
          vendor_id, market_id, vendor_name, market_name, space_size, rental_price, property_type, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        requestData.vendorId,
        requestData.marketId,
        requestData.vendorName,
        requestData.marketName,
        requestData.spaceSize,
        requestData.rentalPrice,
        requestData.propertyType,
        'pending',
      ];
      db.query(query, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  fetchOwnerRequests: (ownerId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          r.id AS requestId,
          r.vendor_id AS vendorId,
          r.market_id AS marketId,
          r.vendor_name AS vendorName,
          m.marketName AS marketName,
          r.space_size AS spaceSize,
          r.rental_price AS rentalPrice,
          r.property_type AS propertyType,
          r.status,
          r.created_at AS createdAt,
          u.name AS vendorNameFromUser,
          u.avatar AS vendorAvatar
        FROM requests r
        INNER JOIN markets m ON r.market_id = m.id
        LEFT JOIN users u ON r.vendor_id = u.id
        WHERE m.owner_id = ?  
        ORDER BY r.created_at DESC
      `;
      db.query(query, [ownerId], (err, results) => {
        if (err) {
          console.error('SQL Error in fetchOwnerRequests:', err);
          return reject(err);
        }
        console.log('Fetched Owner Requests for ownerId', ownerId, ':', results);
        resolve(results);
      });
    });
  },

  fetchRequests: (vendorId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          r.id AS requestId,
          r.vendor_id AS vendorId,
          r.market_id AS marketId,
          r.vendor_name AS vendorName,
          m.marketName AS marketName,
          r.space_size AS spaceSize,
          r.rental_price AS rentalPrice,
          r.property_type AS propertyType,
          r.status,
          r.created_at AS createdAt,
          u.name AS ownerName,
          u.avatar AS ownerAvatar,
          COALESCE(m.images, '[]') AS images,
          m.location AS location  -- Added location from markets table
        FROM requests r
        LEFT JOIN markets m ON r.market_id = m.id
        LEFT JOIN users u ON m.owner_id = u.id
        WHERE r.vendor_id = ?
      `;
      db.query(query, [vendorId], (err, results) => {
        if (err) return reject(err);
        results.forEach((result) => {
          result.images = result.images ? JSON.parse(result.images) : [];
        });
        console.log('Fetched Requests for vendorId', vendorId, ':', results);
        resolve(results);
      });
    });
  },

  updateRequestStatus: (requestId, status) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE requests 
        SET status = ? 
        WHERE id = ?
      `;
      db.query(query, [status, requestId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = requestModel;