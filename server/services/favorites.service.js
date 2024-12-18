import { DatabaseService } from "./db.service.js";

const DEFAULT_USER_ID = "default-user";

export class FavoritesService {
  async getAll() {
    try {
      return await DatabaseService.getFavorites(DEFAULT_USER_ID);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw new Error("Failed to fetch favorites");
    }
  }

  async add(cryptoId) {
    try {
      await DatabaseService.addFavorite(DEFAULT_USER_ID, cryptoId);
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw new Error("Failed to add favorite");
    }
  }

  async remove(cryptoId) {
    try {
      await DatabaseService.removeFavorite(DEFAULT_USER_ID, cryptoId);
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw new Error("Failed to remove favorite");
    }
  }

  async isFavorite(cryptoId) {
    try {
      const favorites = await this.getAll();
      return favorites.includes(cryptoId);
    } catch (error) {
      console.error("Error checking favorite status:", error);
      throw new Error("Failed to check favorite status");
    }
  }
}
