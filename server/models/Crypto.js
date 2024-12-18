import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  priceData: {
    usd: Number,
    usd_24h_change: Number,
    last_updated_at: Date,
  },
});

cryptoSchema.index({ symbol: 1 });
cryptoSchema.index({ name: 1 });

const Crypto = mongoose.model('Crypto', cryptoSchema);

export default Crypto;
