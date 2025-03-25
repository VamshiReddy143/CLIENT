const db = require('../utils/db');
console.log('Imported db in marketModel.js:', db); // Debug log to confirm the import

const Market = {
  create: async (marketData) => {
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
    const result = await db.query(sql, values);
    return { insertId: result.insertId };
  },

  findById: async (id) => {
    const sql = 'SELECT * FROM markets WHERE id = ?';
    const rows = await db.query(sql, [id]);
    return rows[0];
  },

  findAll: async (filters, page, limit) => {
    let sql = 'SELECT * FROM markets WHERE 1=1';
    const values = [];
    if (filters.type) {
      sql += ' AND type = ?';
      values.push(filters.type);
    }
    if (filters.sizeMin) {
      sql += ' AND size >= ?';
      values.push(filters.sizeMin);
    }
    if (filters.sizeMax) {
      sql += ' AND size <= ?';
      values.push(filters.sizeMax);
    }
    if (filters.priceMin) {
      sql += ' AND price >= ?';
      values.push(filters.priceMin);
    }
    if (filters.priceMax) {
      sql += ' AND price <= ?';
      values.push(filters.priceMax);
    }
    if (filters.location) {
      sql += ' AND location LIKE ?';
      values.push(`%${filters.location}%`);
    }
    if (filters.status) {
      sql += ' AND status = ?';
      values.push(filters.status);
    }
    const offset = (page - 1) * limit;
    sql += ' LIMIT ? OFFSET ?';
    values.push(limit, offset);

    console.log('Executing query in marketModel.js:', sql, 'with values:', values);
    const rows = await db.query(sql, values);
    console.log('Query result in marketModel.js:', rows);
    return rows;
  },

  update: async (id, marketData) => {
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
    const result = await db.query(sql, values);
    return { affectedRows: result.affectedRows };
  },



    findAll: (filters, page, limit, callback) => {
      let sql = 'SELECT * FROM markets WHERE 1=1';
      const values = [];
      if (filters.type) {
        sql += ' AND type = ?';
        values.push(filters.type);
      }
      if (filters.sizeMin) {
        sql += ' AND size >= ?';
        values.push(filters.sizeMin);
      }
      if (filters.sizeMax) {
        sql += ' AND size <= ?';
        values.push(filters.sizeMax);
      }
      if (filters.priceMin) {
        sql += ' AND price >= ?';
        values.push(filters.priceMin);
      }
      if (filters.priceMax) {
        sql += ' AND price <= ?';
        values.push(filters.priceMax);
      }
      if (filters.location) {
        sql += ' AND location LIKE ?';
        values.push(`%${filters.location}%`);
      }
      if (filters.status) {
        sql += ' AND status = ?';
        values.push(filters.status);
      }
      const offset = (page - 1) * limit;
      sql += ' LIMIT ? OFFSET ?';
      values.push(limit, offset);
  
      console.log('Executing query in marketModel.js:', sql, 'with values:', values);
      db.query(sql, values, (err, rows) => {
        if (err) {
          console.error('Error in Market.findAll:', err);
          return callback(err);
        }
        console.log('Query result in marketModel.js:', rows);
        callback(null, rows);
      });
    },
  
    updateStatus: (id, status, callback) => {
      const sql = 'UPDATE markets SET status = ? WHERE id = ?';
      db.query(sql, [status, id], (err, result) => {
        if (err) {
          console.error('Error in Market.updateStatus:', err);
          return callback(err);
        }
        callback(null, { affectedRows: result.affectedRows });
      });
    },
  

  updateStatus: async (id, status) => {
    const sql = 'UPDATE markets SET status = ? WHERE id = ?';
    const result = await db.query(sql, [status, id]);
    return { affectedRows: result.affectedRows };
  },

  delete: async (id) => {
    const sql = 'DELETE FROM markets WHERE id = ?';
    const result = await db.query(sql, [id]);
    return { affectedRows: result.affectedRows };
  },
};

module.exports = Market;