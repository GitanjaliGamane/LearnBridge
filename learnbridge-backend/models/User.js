const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
  },
  // Additional fields for students
  grade: {
    type: String,
    required: function() {
      return this.role === 'student';
    },
  },
  subjects: [{
    type: String,
  }],
  // Additional fields for teachers
  qualifications: {
    type: String,
    required: function() {
      return this.role === 'teacher';
    },
  },
  experience: {
    type: String,
    required: function() {
      return this.role === 'teacher';
    },
  },
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified or new
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    
    // Log for debugging
    console.log('Password hashed successfully');
    
    next();
  } catch (error) {
    console.error('Password hashing error:', error);
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Compare the candidate password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Password comparison error:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema); 