import api from '../config/Api';
import { Post } from '../types/models/Post.model';

const PostService = {
  getPost: async (postID: string): Promise<Post> => {
    const { data } = await api.get<Post>(`/post/${postID}`);
    return data;
  },

  updatePost: (post: Post) => {
    return api.put(`/post/${post.id}`, post);
  },

  addPost: (post: Post) => {
    return api.post('/post/add', post).then((res) => {
      return res.data;
    });
  },

  getAllPosts: () => {
    return api.get(`/post`);
  },

  deletePost: (id: string) => {
    return api.delete(`/post/${id}`);
  },
};

export default PostService;
