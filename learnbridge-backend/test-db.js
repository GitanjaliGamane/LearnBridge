const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB Connection URL
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnbridge';

// Create a test schema and model
const testSchema = new mongoose.Schema({
  name: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Test = mongoose.model('Test', testSchema);

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ MongoDB Connected Successfully');
    console.log('📡 Database URL:', mongoURI);
    
    try {
      // Create a test document
      const test = new Test({
        name: 'Test User',
        message: 'Testing database connection from script'
      });
      
      // Save to database
      await test.save();
      console.log('✅ Data saved successfully:', test);
      
      // Retrieve all test documents
      const tests = await Test.find().sort({ timestamp: -1 });
      console.log('✅ Retrieved data:', tests);
      
      // Disconnect from MongoDB
      await mongoose.disconnect();
      console.log('✅ Disconnected from MongoDB');
    } catch (err) {
      console.error('🔴 Error:', err.message);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }); 