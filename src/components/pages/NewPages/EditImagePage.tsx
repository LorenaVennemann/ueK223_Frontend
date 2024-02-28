import React, { useEffect, useState } from 'react';
import { Paper, Grid, TextField, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import PostService from '../../../Services/PostService';
import { Post } from '../../../types/models/Post.model';

const EditPicturePage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  const [initialValues, setInitialValues] = useState({
    id: '',
    image_url: '',
    author_id: '',
    like_count: 0,
    description: '',
  });

  useEffect(() => {
    // Fetch the post data when the component mounts
    const fetchPost = async () => {
      try {
        const response = await PostService.getPost(postId ?? "");
        setInitialValues(response);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (values: Post) => {
    try {
      // Use PostService to update the post
      await PostService.updatePost(values);

      console.log("Post updated successfully:", values);
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
          validateOnChange
          isInitialValid
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <TextField
                id="description"
                label="Description"
                placeholder="Enter the description"
                fullWidth
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
              />
              {props.errors.description && (
                <div id="feedback">{props.errors.description}</div>
              )}

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default EditPicturePage;
