import axios from "axios";
import Cookies from "js-cookie";
import { getCookie } from "../utils/getCookie";

// Base URL for your API
const API_BASE_URL = "http://localhost:5000/api";

// Create an instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for adding Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = getCookie("token"); // Use the utility function to get the token from cookies
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// API methods
const apiService = {
  register: (userData) => apiClient.post("/auth/register", userData),

  login: (credentials) => apiClient.post("/auth/login", credentials),

  logout: () => apiClient.post("/auth/logout"),

  getCurrentUser: () => apiClient.get("/users/me"),

  updateUser: (userData) => apiClient.put("/users/me", userData),

  deleteUser: () => apiClient.delete("/users/me"),

  getAllUsers: () => apiClient.get("/users"),

  addLink: (linkData) => apiClient.post("/links", linkData),

  getAllLinks: () => apiClient.get("/links"),

  getLinksByUserId: (user_id) => apiClient.get("/links"),

  updateLink: (linkId, linkData) => apiClient.put(`/links/${linkId}`, linkData),

  deleteLink: (linkId) => apiClient.delete(`/links/${linkId}`),
};

export default apiService;
