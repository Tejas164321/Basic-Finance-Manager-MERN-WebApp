const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @access  Public
const registerUser = async (userData) => {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email.toLowerCase().trim() });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Validate password length
    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }


    // Hash password with consistent salt rounds
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);



    // Create new user
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    });

    // Save user to database
    const savedUser = await user.save();
    return {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email
    };
  } catch (error) {
    throw error;
  }
};

// @desc    Login user
// @access  Public
const loginUser = async (credentials) => {
  try {
    // Check if user exists (case-insensitive email)
    const email = credentials.email.toLowerCase().trim();
    console.log('Searching for user with email:', email);
    
    const user = await User.findOne({ email });
    console.log('User found:', user ? `ID: ${user._id}, Email: ${user.email}` : 'No user found');

    if (!user) {
      console.log('No user found for email:', email);
      throw new Error('Invalid credentials');
    }



    // Validate password
    console.log('Comparing password for user:', user.email);
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    console.log('Password match result:', isMatch);
    console.log('Stored password hash:', user.password);
    
    if (!isMatch) {
      console.log('Password mismatch for user:', user.email);
      console.log('Provided password:', credentials.password);
      throw new Error('Invalid credentials');
    }



    // Create and return JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser
};
