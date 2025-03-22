const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dateOfBirth: { type: Date, required: true },
  location: { type: String },
  alternateMobile: { type: String },
  hintName: { type: String }
}, {
  timestamps: true
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
