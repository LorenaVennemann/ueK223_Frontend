import { useEffect, useState } from "react";
import Navbar from "../organisms/Navbar";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PostService from "../../Services/PostService";

const ImageGalleryPage = () => {
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

  return (
    <>
      <Typography variant="h6" component="div">
        Title of the page
      </Typography>
      <Navbar/>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post["author_id"]}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </> 
  );
};

export default ImageGalleryPage;
