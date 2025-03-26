// src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const db = require('../utils/db');




exports.getMarketOwnersCount = (req, res) => {
  const userRole = req.user?.userRole;

  // Restrict access to market owners or admins (adjust as needed)
  if (userRole !== 'market_owner' && userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Market owners or admins only.' });
  }

  User.getMarketOwnersCount()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => {
      console.error('Error fetching market owners count:', err);
      res.status(500).json({ message: 'Error fetching market owners count', error: err.message });
    });
};



exports.getVendorsCount = (req, res) => {
  const userRole = req.user?.userRole;

  // Restrict access to market owners or admins (adjust as needed)
  if (userRole !== 'market_owner' && userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Market owners or admins only.' });
  }

  User.getVendorsCount()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => {
      console.error('Error fetching vendors count:', err);
      res.status(500).json({ message: 'Error fetching vendors count', error: err.message });
    });
};

// src/controllers/userController.js
exports.getPlatformPerformance = (req, res) => {
  const userRole = req.user?.userRole;


  // Define the date 30 days ago for "new" metrics
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 19).replace('T', ' ');

  // Query to get platform performance metrics
  const query = `
    SELECT 
      (SELECT COUNT(*) 
       FROM users 
       WHERE user_role = 'market_owner' 
       AND created_at >= ?) AS new_market_owners,
      (SELECT COUNT(*) 
       FROM users 
       WHERE user_role = 'vendor' 
       AND created_at >= ?) AS new_vendors,
      (SELECT COUNT(*) 
       FROM listings 
       WHERE created_at >= ?) AS new_listings;
  `;

  db.query(query, [thirtyDaysAgoStr, thirtyDaysAgoStr, thirtyDaysAgoStr], (err, results) => {
    if (err) {
      console.error('Error fetching platform performance:', err);
      return res.status(500).json({ message: 'Error fetching platform performance', error: err.message });
    }

    const data = results[0];
    const performanceData = [
      { category: 'newMarketOwners', value: Number(data.new_market_owners), fill: '#FFD66B' },
      { category: 'newVendors', value: Number(data.new_vendors), fill: '#5B93FF' },
      { category: 'newListings', value: Number(data.new_listings), fill: '#FF8F6B' },
    ];

    res.status(200).json(performanceData);
  });
};

exports.getUserSignupsByMonth = (req, res) => {
  const userRole = req.user?.userRole;
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  const query = `
    SELECT 
      DATE_FORMAT(created_at, '%Y-%m') AS month,
      SUM(CASE WHEN user_role = 'vendor' THEN 1 ELSE 0 END) AS vendors,
      SUM(CASE WHEN user_role = 'market_owner' THEN 1 ELSE 0 END) AS market_owners
    FROM users
    WHERE user_role IN ('vendor', 'market_owner')
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
    ORDER BY month ASC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user signups by month:', err);
      return res.status(500).json({ message: 'Error fetching user signups', error: err.message });
    }

    // Define the range of months (e.g., last 6 months)
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // e.g., "2024-03"
      months.push({
        monthKey,
        month: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
      });
    }

    // Merge the results with the month range
    const signupData = months.map(({ monthKey, month }) => {
      const row = results.find(r => r.month === monthKey) || { vendors: 0, market_owners: 0 };
      return {
        month,
        vendors: Number(row.vendors),
        marketOwners: Number(row.market_owners),
      };
    });

    res.status(200).json(signupData);
  });
};

exports.registerUser = (req, res) => {
  const { name, email, phone, address, password, user_role, avatar } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error hashing password', error: err.message });
    }

    User.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      user_role,
      avatar,
    })
      .then(result => {
        const token = jwt.sign(
          { userId: result.insertId, userRole: user_role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.status(201).json({
          message: 'User registered successfully',
          user: { id: result.insertId, name, email, user_role },
          token,
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Error registering user', error: err.message });
      });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      bcrypt.compare(password, user.password, (err, isPasswordValid) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error comparing passwords', error: err.message });
        }

        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
          { userId: user.id, userRole: user.user_role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.json({ message: 'Login successful', token });
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error logging in', error: err.message });
    });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  console.log('Fetching user with ID:', userId, 'Type:', typeof userId); // Log the ID and its type

  User.findById(userId)
    .then(user => {
      console.log('User found:', user); // Log the user
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error('Error retrieving user:', err);
      res.status(500).json({ message: 'Error retrieving user', error: err.message });
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, address, user_role, avatar } = req.body;

  User.update(userId, { name, email, phone, address, user_role, avatar })
    .then(result => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error updating user', error: err.message });
    });
};

// src/controllers/userController.js
// src/controllers/userController.js
exports.getAllUsers = (req, res) => {
  const { user_role } = req.query;

  // Base query to fetch users
  let query = 'SELECT * FROM users';
  const queryParams = [];

  // Add conditions based on query parameters
  if (user_role) {
    query += ' WHERE user_role = ?';
    queryParams.push(user_role);
  }

  // Fetch users
  db.query(query, queryParams, (err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }

    if (user_role === 'market_owner') {
      // Fetch the number of listings for each market owner
      const ownerIds = users.map(user => user.id);
      if (ownerIds.length === 0) {
        return res.status(200).json(users);
      }

      const listingsQuery = `
        SELECT user_id, COUNT(*) as listing_count
        FROM listings
        WHERE user_id IN (?)
        GROUP BY user_id
      `;
      db.query(listingsQuery, [ownerIds], (err, listings) => {
        if (err) {
          console.error('Error fetching listings count:', err);
          return res.status(500).json({ message: 'Error fetching listings count', error: err.message });
        }

        // Map the listing count to each user
        const usersWithListings = users.map(user => {
          const listing = listings.find(l => l.user_id === user.id);
          return {
            ...user,
            total_listings: listing ? Number(listing.listing_count) : 0,
          };
        });

        res.status(200).json(usersWithListings);
      });
    } else {
      res.status(200).json(users);
    }
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  User.delete(userId)
    .then(result => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error deleting user', error: err.message });
    });
};

exports.updatePassword = (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error hashing password', error: err.message });
    }

    const sql = 'UPDATE users SET password = ? WHERE id = ?';
    const values = [hashedPassword, userId];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating password', error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'Password updated successfully' });
    });
  });
};


// src/controllers/userController.js
// src/controllers/userController.js
// src/controllers/userController.js
exports.getVendorListings = (req, res) => {
  const vendorId = req.params.id;

  const query = `
    SELECT 
      r.id AS requestId,
      r.market_id AS marketId,
      r.market_name AS marketName,
      r.space_size AS spaceSize,
      r.rental_price AS rentalPrice,
      r.property_type AS propertyType,
      r.status,
      m.location,
      r.created_at,
      m.images AS images
    FROM requests r
    JOIN markets m ON r.market_id = m.id
    WHERE r.vendor_id = ?
    AND r.status = 'approved'
  `;
  db.query(query, [vendorId], (err, listings) => {
    if (err) {
      console.error('Error fetching vendor listings:', err);
      return res.status(500).json({ message: 'Error fetching vendor listings', error: err.message });
    }
    const formattedListings = listings.map(listing => {
      let imagesArray = [];
      if (listing.images) {
        try {
          // markets.images is TEXT, so it might be a JSON string or plain URL
          imagesArray = typeof listing.images === 'string' ? JSON.parse(listing.images) : listing.images;
        } catch (e) {
          // If not valid JSON, treat as a single URL
          imagesArray = [listing.images];
        }
      }
      return {
        ...listing,
        images: Array.isArray(imagesArray) ? imagesArray : [],
      };
    });
    res.status(200).json(formattedListings);
  });
};

// Forgot Password Handler
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  // Check if email exists in the database
  User.findByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Please enter the valid email you signed up with.' });
      }

      // Generate a reset token (valid for 15 minutes)
      const resetToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      // Return the reset token to the frontend
      res.status(200).json({
        message: 'Reset token generated successfully',
        resetToken,
        userId: user.id,
      });
    })
    .catch(err => {
      console.error('Error in forgot password:', err);
      res.status(500).json({ message: 'Error processing forgot password request', error: err.message });
    });
};

// Reset Password Handler
exports.resetPassword = (req, res) => {
  const { token, newPassword } = req.body;

  // Verify the reset token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const userId = decoded.userId;

    // Hash the new password
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing new password:', err);
        return res.status(500).json({ message: 'Error hashing new password', error: err.message });
      }

      // Update the user's password in the database
      const sql = 'UPDATE users SET password = ? WHERE id = ?';
      db.query(sql, [hashedPassword, userId], (err, result) => {
        if (err) {
          console.error('Error updating password:', err);
          return res.status(500).json({ message: 'Error updating password', error: err.message });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password reset successfully' });
      });
    });
  });
};