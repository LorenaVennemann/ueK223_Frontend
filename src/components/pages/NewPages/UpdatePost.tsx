import React, { useContext, useState } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import PostService from "../../../Services/PostService";
import Navbar from "../../organisms/Navbar";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import { LocalGasStation } from "@mui/icons-material";

const UpdatePost: React.FC = () => {
  const { user} = useContext(ActiveUserContext)
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (values: {
    id: string;
    image: string;
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
          id: location.state.id,
          image: location.state.image,
          description: location.state.description,
          author_id: location.state.id,
          like_count: location.state.like_count,
        }}
        enableReinitialize
        onSubmit={handleSubmit}
        validateOnChange
        isInitialValid
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <TextField
              id="image"
              label="Image URL"
              placeholder="Enter the URL of the image"
              fullWidth
              onChange={props.handleChange}
              value={props.values.image}
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
