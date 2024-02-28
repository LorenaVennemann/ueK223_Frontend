import { Paper, TextField, Button, Input } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import PostService from "../../../Services/PostService";
import Navbar from "../../organisms/Navbar";
import { useContext } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

const PostPicture = () => {
  const { user } = useContext(ActiveUserContext);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const navigate = useNavigate();
  const btnstyle = { margin: "8px 0" };

  const handleSubmit = async (values: {
    id: string;
    image: string;
    description: string;
    author_id: string;
    like_count: 0;
  }) => {
    try {
      await PostService.addPost(values);
      console.log("Post added successfully:", values);
      navigate("/gallery");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <Formik
        initialValues={{
          id: "",
          image: "",
          description: "",
          author_id: user!.id,
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
              id="image"
              label="Image URL"
              placeholder="Enter the URL of the image"
              fullWidth
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.image}
            />
            {props.errors.image && (
              <div id="feedback">{props.errors.image}</div>
            )}
            <TextField
              id="description"
              label="description"
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
              Post
            </Button>
            <Navbar />
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default PostPicture;
