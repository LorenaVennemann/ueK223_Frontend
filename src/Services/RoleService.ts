// Import the API configuration to make HTTP requests to the backend.
import api from "../config/Api";

// Initialize an empty set to potentially store role information, although it's not used in this snippet.
const roleSet = new Set();

// Define an object 'RoleService' containing methods related to role operations.
const RoleService = {
  // Method to fetch all roles from the backend and sending GET request.
  findAll: () => api.get("/roles")
}
export default RoleService;
