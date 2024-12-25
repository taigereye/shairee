import axios from "axios";
import { GENIUS_API_TOKEN } from "./config";


const API_URL = "https://api.genius.com";

// Function to fetch songs from Genius API
export const fetchSongs = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        q: searchTerm,
        access_token: GENIUS_API_TOKEN
      }
    });
    return response.data.response.hits.map(hit => hit.result);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};
