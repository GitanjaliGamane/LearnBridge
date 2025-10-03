const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// MongoDB Connection URL
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnbridge';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    createAdminUser();
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Function to create admin user
async function createAdminUser() {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@learnbridge.com',
      password: 'admin123', // This will be hashed by the pre-save middleware
      role: 'admin'
    });
    
    // Save admin user
    await adminUser.save();
    
    console.log('Admin user created successfully');
    console.log('Email: admin@learnbridge.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
} 