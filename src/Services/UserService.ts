import api from '../config/Api';
import { User } from '../types/models/User.model';

// Define the UserService object with various user-related operations.
const UserService = {
  
  // Async function to get a user by their ID, returning a promise that resolves with a User object.
  getUser: async (userID: string): Promise<User> => {
    const { data } = await api.get<User>(`/user/${userID}`);
    return data;
  },

  // Function to update a user's information. It takes a User object as a parameter.
  updateUser: (user: User) => {
    return api.put(`/user/${user.id}`, user);
  },

  // Function to add a new user. It takes a User object as a parameter.
  addUser: (user: User) => {
    return api.post('/user/registerUser', user).then((res) => {
      return res.data;
    });
  },

  // Function to retrieve all users.
  getAllUsers: () => {
    return api.get(`/user`);
  },

  // Function to delete a user by their ID.
  deleteUser: (id: string) => {
    return api.delete(`/user/${id}`);
  },
};

export default UserService;
