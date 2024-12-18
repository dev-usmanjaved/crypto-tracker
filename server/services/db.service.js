import User from "../models/User.js";
import Crypto from "../models/Crypto.js";

export class DatabaseService {
  static async getFavorites(userId) {
    try {
      const user = await User.findOne({ userId });
      return user?.favorites || [];
    } catch (error) {
      console.error("Database error while fetching favorites:", error);
      throw new Error("Failed to fetch favorites from database");
    }
  }

  static async addFavorite(userId, cryptoId) {
    try {
      await User.findOneAndUpdate(
        { userId },
        {
          $addToSet: { favorites: cryptoId },
          $setOnInsert: { userId },
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
    } catch (error) {
      console.error("Database error while adding favorite:", error);
      throw new Error("Failed to add favorite to database");
    }
  }

  static async removeFavorite(userId, cryptoId) {
    try {
      await User.findOneAndUpdate(
        { userId },
        { $pull: { favorites: cryptoId } },
        { runValidators: true }
      );
    } catch (error) {
      console.error("Database error while removing favorite:", error);
      throw new Error("Failed to remove favorite from database");
    }
  }

  static async updateCryptoPrice(coinId, price, priceChange) {
    try {
      await Crypto.findOneAndUpdate(
        { coinId },
        {
          $set: {
            "priceData.usd": price,
            "priceData.usd_24h_change": priceChange,
            "priceData.last_updated_at": new Date(),
            lastUpdated: new Date(),
          },
        },
        {
          upsert: true,
          runValidators: true,
        }
      );
    } catch (error) {
      console.error("Database error while updating crypto price:", error);
      throw new Error("Failed to update crypto price in database");
    }
  }

  static async getCryptosByIds(coinIds) {
    try {
      return await Crypto.find({ coinId: { $in: coinIds } })
        .select("coinId symbol name priceData")
        .lean();
    } catch (error) {
      console.error("Database error while fetching cryptos:", error);
      throw new Error("Failed to fetch cryptos from database");
    }
  }
}
