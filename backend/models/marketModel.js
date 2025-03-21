// backend/models/marketModel.js
// backend/models/marketModel.js
const db = require('../utils/db');

exports.create = (marketData) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO markets (
        ownerName, email, phone, marketName, location, price, size, type, services, 
        images, videos, status, rating, featured, highlights
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      marketData.ownerName, marketData.email, marketData.phone, marketData.marketName, 
      marketData.location, marketData.price, marketData.size, marketData.type, 
      JSON.stringify(marketData.services), JSON.stringify(marketData.images), 
      JSON.stringify(marketData.videos), marketData.status, marketData.rating, 
      marketData.featured, marketData.highlights ? JSON.stringify(marketData.highlights) : null // Handle highlights
    ];
    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM markets WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

exports.findAll = (filters, page, limit) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM markets WHERE 1=1';
    const values = [];
    if (filters.featured) { // Add featured filter
      query += ' AND featured = ?';
      values.push(1);
    }
    if (filters.type) {
      query += ' AND type = ?';
      values.push(filters.type);
    }
    if (filters.location) {
      query += ' AND location LIKE ?';
      values.push(`%${filters.location}%`);
    }
    if (filters.priceMin) {
      query += ' AND price >= ?';
      values.push(filters.priceMin);
    }
    if (filters.priceMax) {
      query += ' AND price <= ?';
      values.push(filters.priceMax);
    }
    if (filters.sizeMin) {
      query += ' AND size >= ?';
      values.push(filters.sizeMin);
    }
    if (filters.sizeMax) {
      query += ' AND size <= ?';
      values.push(filters.sizeMax);
    }
    query += ' LIMIT ? OFFSET ?';
    values.push(limit, (page - 1) * limit);

    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.update = (id, marketData) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE markets SET ownerName = ?, email = ?, phone = ?, marketName = ?, location = ?, 
      price = ?, size = ?, type = ?, services = ?, images = ?, videos = ?, status = ?, 
      rating = ?, featured = ?, highlights = ? WHERE id = ?
    `;
    const values = [
      marketData.ownerName, marketData.email, marketData.phone, marketData.marketName, 
      marketData.location, marketData.price, marketData.size, marketData.type, 
      JSON.stringify(marketData.services), JSON.stringify(marketData.images), 
      JSON.stringify(marketData.videos), marketData.status, marketData.rating, 
      marketData.featured, marketData.highlights ? JSON.stringify(marketData.highlights) : null, 
      id
    ];
    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM markets WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};