require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../backend/models/User');
const bcrypt = require('bcryptjs');


const createTestUser = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Create test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: await bcrypt.hash('test1234', 10)
    });
    console.log('Test user created:', testUser);


    // Save user
    const savedUser = await testUser.save();
    console.log('Test user saved successfully:', {
      id: savedUser._id,
      email: savedUser.email,
      passwordHash: savedUser.password
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
