// const db = require('../utils/db'); // Import db utility for MySQL connection

// // Create a new request
// exports.create = (requestData) => {
//   return new Promise((resolve, reject) => {
//     const query = 'INSERT INTO requests (from_user, to_user, meeting_location, meeting_time, rental_date, request_role, market_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
//     db.query(query, [
//       requestData.from_user, requestData.to_user, requestData.meeting_location, requestData.meeting_time,
//       requestData.rental_date, requestData.request_role, requestData.market_id
//     ], (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(result);
//     });
//   });
// };

// // Get all requests
// exports.findAll = () => {
//   return new Promise((resolve, reject) => {
//     const query = 'SELECT * FROM requests';
//     db.query(query, (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(result);
//     });
//   });
// };

// // Get request by ID
// exports.findById = (id) => {
//   return new Promise((resolve, reject) => {
//     const query = 'SELECT * FROM requests WHERE id = ?';
//     db.query(query, [id], (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(result[0]);
//     });
//   });
// };

// // Update a request by ID
// exports.update = (id, requestData) => {
//   return new Promise((resolve, reject) => {
//     const query = 'UPDATE requests SET meeting_location = ?, meeting_time = ?, rental_date = ?, request_role = ?, market_id = ?, updated_at = NOW() WHERE id = ?';
//     db.query(query, [
//       requestData.meeting_location, requestData.meeting_time, requestData.rental_date, requestData.request_role, 
//       requestData.market_id, id
//     ], (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(result);
//     });
//   });
// };

// // Delete a request by ID
// exports.delete = (id) => {
//   return new Promise((resolve, reject) => {
//     const query = 'DELETE FROM requests WHERE id = ?';
//     db.query(query, [id], (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(result);
//     });
//   });
// };



// backend/models/requestModel.js
// backend/models/requestModel.js
// backend/models/requestModel.js
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
          u.name AS vendorNameFromUser,
          u.avatar AS vendorAvatar
        FROM requests r
        INNER JOIN markets m ON r.market_id = m.id
        LEFT JOIN users u ON r.vendor_id = u.id
        WHERE m.owner_id = ?  -- Changed from m.user_id to m.owner_id
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
          u.name AS ownerName,
          u.avatar AS ownerAvatar,
          COALESCE(m.images, '[]') AS images
        FROM requests r
        LEFT JOIN markets m ON r.market_id = m.id
        LEFT JOIN users u ON m.owner_id = u.id  -- Changed from m.user_id to m.owner_id
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