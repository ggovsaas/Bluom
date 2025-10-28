// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check for custom API URL in environment variables first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're in development (only for localhost)
  if (import.meta.env.DEV && window.location.hostname === 'localhost') {
    return 'http://localhost:3001';
  }
  
  // Production backend URL (Vercel serverless functions)
  return 'https://aifitnessapp.vercel.app';
};

// Force production URL for debugging
const FORCE_PRODUCTION = true;
const getApiBaseUrlForced = () => {
  if (FORCE_PRODUCTION) {
    return 'https://aifitnessapp.vercel.app';
  }
  return getApiBaseUrl();
};

export const API_BASE_URL = getApiBaseUrlForced();

// API endpoints
export const API_ENDPOINTS = {
  // Food endpoints
  FOODS_SEARCH: `${API_BASE_URL}/api/foods/search`,
  FOODS_RECOGNIZE: `${API_BASE_URL}/api/foods/recognize`,
  USER_LOG_FOOD: `${API_BASE_URL}/api/user/log-food`,
  
  // Recipe endpoints
  RECIPES: `${API_BASE_URL}/api/recipes`,
  ADMIN_RECIPES: `${API_BASE_URL}/api/admin/recipes`,
  
  // Workout endpoints
  WORKOUTS: `${API_BASE_URL}/api/workouts`,
  ADMIN_WORKOUTS: `${API_BASE_URL}/api/admin/workouts`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`,
} as const;

export default API_BASE_URL;


