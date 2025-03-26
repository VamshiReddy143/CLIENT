const db = require('../utils/db');
console.log('Imported db in marketModelWrapper.js:', db);

const Market = {
  create: (marketData, callback) => {
    const sql = `
      INSERT INTO markets (
        owner_id, ownerName, email, phone, marketName, location, price, size, type, 
        services, status, rating, featured, images, videos, highlights
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      marketData.owner_id,
      marketData.ownerName,
      marketData.email,
      marketData.phone,
      marketData.marketName,
      marketData.location,
      marketData.price,
      marketData.size,
      marketData.type,
      JSON.stringify(marketData.services),
      marketData.status,
      marketData.rating,
      marketData.featured,
      JSON.stringify(marketData.images),
      JSON.stringify(marketData.videos),
      JSON.stringify(marketData.highlights),
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error in Market.create (wrapper):', err);
        return callback(err);
      }
      callback(null, { insertId: result.insertId });
    });
  },

  findById: (id, callback) => {
    const sql = 'SELECT * FROM markets WHERE id = ?';
    db.query(sql, [id], (err, rows) => {
      if (err) {
        console.error('Error in Market.findById (wrapper):', err);
        return callback(err);
      }
      callback(null, rows[0]);
    });
  },

  findAll: (filters, page, limit, callback) => {
    let sql = `
      SELECT markets.*, users.name AS ownerName, users.avatar AS ownerAvatar
      FROM markets
      LEFT JOIN users ON markets.owner_id = users.id
      WHERE 1=1
    `;
    const values = [];
    if (filters.type) {
      sql += ' AND markets.type = ?';
      values.push(filters.type);
    }
    if (filters.sizeMin) {
      sql += ' AND markets.size >= ?';
      values.push(filters.sizeMin);
    }
    if (filters.sizeMax) {
      sql += ' AND markets.size <= ?';
      values.push(filters.sizeMax);
    }
    if (filters.priceMin) {
      sql += ' AND markets.price >= ?';
      values.push(filters.priceMin);
    }
    if (filters.priceMax) {
      sql += ' AND markets.price <= ?';
      values.push(filters.priceMax);
    }
    if (filters.location) {
      sql += ' AND markets.location LIKE ?';
      values.push(`%${filters.location}%`);
    }
    if (filters.status) {
      sql += ' AND markets.status = ?';
      values.push(filters.status);
    }
  
    // Add sorting logic
    if (filters.sort) {
      if (filters.sort === 'highToLow') {
        sql += ' ORDER BY markets.price DESC';
      } else if (filters.sort === 'lowToHigh') {
        sql += ' ORDER BY markets.price ASC';
      } else if (filters.sort === 'newest') {
        sql += ' ORDER BY markets.created_at DESC';
      }
    } else {
      // Default sorting: newest first
      sql += ' ORDER BY markets.created_at DESC';
    }
  
    const offset = (page - 1) * limit;
    sql += ' LIMIT ? OFFSET ?';
    values.push(limit, offset);
  
    console.log('Executing query in marketModelWrapper.js:', sql, 'with values:', values);
    db.query(sql, values, (err, rows) => {
      if (err) {
        console.error('Error in Market.findAll (wrapper):', err);
        return callback(err);
      }
      console.log('Query result in marketModelWrapper.js:', rows);
      callback(null, rows);
    });
  },

  
  update: (id, marketData, callback) => {
    const sql = `
      UPDATE markets 
      SET ownerName = ?, email = ?, phone = ?, marketName = ?, location = ?, price = ?, 
          size = ?, type = ?, services = ?, status = ?, rating = ?, featured = ?, 
          images = ?, videos = ?, highlights = ?
      WHERE id = ?
    `;
    const values = [
      marketData.ownerName,
      marketData.email,
      marketData.phone,
      marketData.marketName,
      marketData.location,
      marketData.price,
      marketData.size,
      marketData.type,
      JSON.stringify(marketData.services),
      marketData.status,
      marketData.rating,
      marketData.featured,
      JSON.stringify(marketData.images),
      JSON.stringify(marketData.videos),
      JSON.stringify(marketData.highlights),
      id,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error in Market.update (wrapper):', err);
        return callback(err);
      }
      callback(null, { affectedRows: result.affectedRows });
    });
  },

  updateStatus: (id, status, callback) => {
    const sql = 'UPDATE markets SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        console.error('Error in Market.updateStatus (wrapper):', err);
        return callback(err);
      }
      callback(null, { affectedRows: result.affectedRows });
    });
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM markets WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error in Market.delete (wrapper):', err);
        return callback(err);
      }
      callback(null, { affectedRows: result.affectedRows });
    });
  },
};

module.exports = Market;