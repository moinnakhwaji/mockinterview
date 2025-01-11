import axios from 'axios';

/**
 * Fetches the user's previous mock data from the API.
 * @param {string} email - The user's email address.
 * @returns {Promise<Object>} - A promise resolving to the fetched data.
 */
export const getPreviousMockData = async (email: string) => {
  try {
    if (!email) {
      throw new Error("User not authenticated");
    }

    const response = await axios.post("/api/wait", {
      email, // Send email in the request body
    });

    return response.data;
  } catch (error:any) {
    throw new Error("Failed to fetch data",error);
  }
};
