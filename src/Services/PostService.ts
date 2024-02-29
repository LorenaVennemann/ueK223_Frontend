import api from '../config/Api';
import { Post } from '../types/models/Post.model';

const PostService = {


  updatePost: (post: Post) => {
    return api.put(`/post/${post.id}`, post);
  },

  addPost: (post : Post) => {
    return api.post('/post/add', post)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error('Fehler beim Hinzufügen des Posts:', error);
      throw error;
      });
  },

  getAllPosts: () => {
    return api.get(`/post`);
  },

  deletePost: (id: string) => {
    return api.delete(`/post/${id}`);
  },

  getLikersForPost: (postId: string) => {
    return api.get(`/post/${postId}/likers`);
  },
};

export default PostService;