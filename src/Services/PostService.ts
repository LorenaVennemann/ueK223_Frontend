import api from '../config/Api';
import { Post } from '../types/models/Post.model';

// Define an object 'PostService' with methods for CRUD operations and more on posts stuff
const PostService = {
  // Method to update an existing post, takes a 'post' object as a parameter


  updatePost: (post: Post) => {
    return api.put(`/post/${post.id}`, post);
  },

  // Method to add a new post, takes a 'post' object as a parameter
  addPost: (post : Post) => {
    return api.post('/post/add', post)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error('Fehler beim Hinzufügen des Posts:', error);
      throw error; // Rethrow the error to be handled by the caller
      });
  },

  // Method to retrieve all posts
  getAllPosts: () => {
    return api.get(`/post`);
  },

  // Method to delete a post by ID
  deletePost: (id: string) => {
    return api.delete(`/post/${id}`);
  },

  // Method to get all likers (users who liked) for a specific post by the ID
  getLikersForPost: (postId: string) => {
    return api.get(`/post/${postId}/likers`);
  },
};

export default PostService;