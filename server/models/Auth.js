//user models
const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
   email: {
    type: String,
    required: true
   },
   password: {
    type: String,
    required: true
   },
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Auth', authSchema);