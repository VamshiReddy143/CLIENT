const db = require('../utils/db'); // Import db utility for MySQL connection

// Create a new request
exports.create = (requestData) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO requests (from_user, to_user, meeting_location, meeting_time, rental_date, request_role, market_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
      requestData.from_user, requestData.to_user, requestData.meeting_location, requestData.meeting_time,
      requestData.rental_date, requestData.request_role, requestData.market_id
    ], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Get all requests
exports.findAll = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM requests';
    db.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Get request by ID
exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM requests WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0]);
    });
  });
};

// Update a request by ID
exports.update = (id, requestData) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE requests SET meeting_location = ?, meeting_time = ?, rental_date = ?, request_role = ?, market_id = ?, updated_at = NOW() WHERE id = ?';
    db.query(query, [
      requestData.meeting_location, requestData.meeting_time, requestData.rental_date, requestData.request_role, 
      requestData.market_id, id
    ], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Delete a request by ID
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM requests WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};