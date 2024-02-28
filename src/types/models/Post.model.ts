export type Post = {
  id: string;
  image_url: string;
  author_id: string | undefined;
  like_count: number;
  description: string;
};
