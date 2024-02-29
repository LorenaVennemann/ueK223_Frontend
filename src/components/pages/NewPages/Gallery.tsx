import { useContext, useEffect, useState } from "react";
import Navbar from "../../organisms/Navbar";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import PostService from "../../../Services/PostService"; // Service for fetching posts data.
import { Link } from "react-router-dom"; // For linking to other routes.
import LikeButton from "../../atoms/LikeButton"; // A component for liking posts.
import ActiveUserContext from "../../../Contexts/ActiveUserContext"; // Context to access the active user.

const ImageGalleryPage = () => {
  const [posts, setPosts] = useState([]);
  const reloadPage = () => {
    window.location.reload();
  };

  const { user } = useContext(ActiveUserContext); // Use context to get the current user

  useEffect(() => { // Effect hook to fetch posts when the component mounts
    const fetchPosts = async () => { // Async function to fetch posts
      try {
        const response = await PostService.getAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, []);

  return (
    <>
      <Typography variant="h6" component="div">
        Gallery
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post["id"]}>
            <Card>
              <CardMedia
                component="img"
                alt={post["author"]}
                height="140"
                image={post["image"]}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {post["author"]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Description: {post["description"]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  ID: {post["id"]}
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/update-post/`}
                  state={post}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                      PostService.deletePost(post["id"]).then(reloadPage);
                  }}
                >
                  Delete
                </Button>
                <LikeButton />
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
