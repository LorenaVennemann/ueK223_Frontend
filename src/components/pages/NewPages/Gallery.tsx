import { useEffect, useState } from "react";
import Navbar from "../../organisms/Navbar";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import PostService from "../../../Services/PostService";
import { Link } from "react-router-dom";

const ImageGalleryPage = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await PostService.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Typography variant="h6" component="div">
        Gallery
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                alt={post.author}
                height="140"
                image={post.image}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {post.author}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  ID: {post.id}
                </Typography>
                {user && (user.isAdmin || user.username === post.author) && (
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/update-post/${post.id}`}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Navbar />
    </>
  );
};

export default ImageGalleryPage;