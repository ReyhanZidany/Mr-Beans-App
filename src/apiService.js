// src/apiService.js
import axios from "axios";

export class CoffeeAPIService {
  static async fetchCoffeeBeans() {
    const response = await axios.get("https://fake-coffee-api.vercel.app/api");
    return response.data;
  }
}
