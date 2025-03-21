const db = require('../utils/db'); // Import the db utility for MySQL connection

// Create a new user
exports.create = (userData) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, phone, address, password, user_role, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [userData.name, userData.email, userData.phone, userData.address, userData.password, userData.user_role, userData.avatar], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Get all users
exports.findAll = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      db.query(query, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };
  
// Delete a user by ID
exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], (err, result) => {
        if (err) {
            return reject(err);
        }
        resolve(result);
        });
    });
};

// Find a user by email
exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0]);
    });
  });
};

// Find a user by ID
exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0]);
    });
  });
};

// Update user data by ID
exports.update = (id, userData) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET name = ?, email = ?, phone = ?, address = ?, user_role = ?, avatar = ?, updated_at = NOW() WHERE id = ?';
    db.query(query, [userData.name, userData.email, userData.phone, userData.address, userData.user_role, userData.avatar, id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};