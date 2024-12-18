import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  favorites: [{
    type: String,
    ref: 'Crypto'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

userSchema.index({ 'favorites': 1 });

const User = mongoose.model('User', userSchema);

export default User;
