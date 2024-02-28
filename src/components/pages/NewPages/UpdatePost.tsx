import React, { useState } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import PostService from "../../../Services/PostService";
import Navbar from "../../organisms/Navbar";

const UpdatePost: React.FC = () => {
  const [postId, setPostId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    id: string;
    image_url: string;
    description: string;
    author_id: string;
    like_count: number;
  }) => {
    try {
      await PostService.updatePost(values);
      console.log("Post erfolgreich aktualisiert:", values);
      navigate("/gallery");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Posts:", error);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  return (
    <Paper elevation={10} style={paperStyle}>
      <Formik
        initialValues={{
          id: postId,
          image_url: "",
          description: "",
          author_id: "",
          like_count: 0,
        }}
        enableReinitialize
        onSubmit={handleSubmit}
        validateOnChange
        isInitialValid
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <TextField
              id="postId"
              label="Post ID"
              placeholder="Enter the ID of the post"
              fullWidth
              onChange={(e) => setPostId(e.target.value)}
              value={postId}
            />
            <TextField
              id="image_url"
              label="Image URL"
              placeholder="Enter the URL of the image"
              fullWidth
              onChange={props.handleChange}
              value={props.values.image_url}
            />
            <TextField
              id="description"
              label="Description"
              placeholder="Enter the description"
              fullWidth
              onChange={props.handleChange}
              value={props.values.description}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Update
            </Button>
            <Navbar />
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default UpdatePost;
