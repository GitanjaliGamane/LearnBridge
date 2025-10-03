const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnbridge';

// Connect to MongoDB with enhanced error handling
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    console.log('📡 Database URL:', mongoURI);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    // Exit process with failure
    process.exit(1);
  });

// Monitor MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected');
});

// Create a test schema and model
const testSchema = new mongoose.Schema({
  name: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Test = mongoose.model('Test', testSchema);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Database test routes
app.post('/api/db-test', async (req, res) => {
  try {
    const { name, message } = req.body;
    
    // Create a new test document
    const test = new Test({
      name: name || 'Test User',
      message: message || 'Testing database connection'
    });
    
    // Save to database
    await test.save();
    
    res.json({ 
      success: true, 
      message: 'Data saved successfully',
      data: test
    });
  } catch (err) {
    console.error('🔴 Database test error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving data',
      error: err.message
    });
  }
});

app.get('/api/db-test', async (req, res) => {
  try {
    // Retrieve all test documents
    const tests = await Test.find().sort({ timestamp: -1 });
    
    res.json({ 
      success: true, 
      count: tests.length,
      data: tests
    });
  } catch (err) {
    console.error('🔴 Database test error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving data',
      error: err.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔴 Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
}); 