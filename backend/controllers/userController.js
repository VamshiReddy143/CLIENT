const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import the user model
const db = require('../utils/db');


exports.registerUser = async (req, res) => {
  const { name, email, phone, address, password, user_role, avatar } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      user_role, // "vendor" or "market_owner" from signup
      avatar,
    });

    const token = jwt.sign(
      { userId: newUser.id, userRole: newUser.user_role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).json({ message: 'User registered successfully', user: newUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, userRole: user.user_role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, address, user_role, avatar } = req.body;

  try {
    const updatedUser = await User.update(userId, { name, email, phone, address, user_role, avatar });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching users' });
    }
};
  
// Delete a user
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        await User.delete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user' });
    }
};



exports.updatePassword = async (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'UPDATE users SET password = ? WHERE id = ?';
    const values = [hashedPassword, userId];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating password' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'Password updated successfully' });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error hashing password' });
  }
};
