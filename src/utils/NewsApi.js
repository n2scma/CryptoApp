// Import the API key and axios for making HTTP requests
import { newsApiKey } from "./ApiKey";
import axios from "axios";

// Base URL for the News API
const apiBaseUrl = "https://newsapi.org/v2";

// Keywords for fetching specific news categories
const breakingKeywords = "bitcoin";
const recommendedKeywords = "crypto OR cryptocurrency OR ethereum OR litecoin";
const pageSize = 10;  // Number of articles to fetch per request

// Construct URLs for fetching breaking and recommended news
const breakingNewsUrl = `${apiBaseUrl}/everything?q=${encodeURIComponent(breakingKeywords)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${newsApiKey}`;
const recommendedNewsUrl = `${apiBaseUrl}/everything?q=${encodeURIComponent(recommendedKeywords)}&sortBy=relevancy&pageSize=${pageSize}&apiKey=${newsApiKey}`;

/**
 * Helper function to construct a URL for searching news based on a query.
 * @param {string} query - Search query string.
 * @param {number} pageSize - Number of results per page.
 * @returns {string} - URL for the search query.
 */
const searchNewsUrl = (query, pageSize = 25) =>
  `${apiBaseUrl}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&apiKey=${newsApiKey}`;

/**
 * Generic function to make API calls.
 * @param {string} endpoint - The URL to which the request will be sent.
 * @param {Object} [params={}] - Additional query parameters for the request.
 * @returns {Object} - The response data from the API call.
 */
const newsApiCall = async (endpoint, params = {}) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {};
  }
};

/**
 * Fetch breaking news articles.
 * @returns {Promise<Object>} - Asynchronous response with the news data.
 */
export const fetchBreakingNews = async () => {
  return await newsApiCall(breakingNewsUrl);
};

/**
 * Fetch recommended news articles.
 * @returns {Promise<Object>} - Asynchronous response with the news data.
 */
export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendedNewsUrl);
};

/**
 * Fetch news based on a search query.
 * @param {string} query - Search query for the news.
 * @returns {Promise<Object>} - Asynchronous response with the news data.
 */
export const fetchSearchNews = async (query) => {
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(endpoint);
};
