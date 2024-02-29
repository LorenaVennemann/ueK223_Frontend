import { Paper, TextField, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import PostService from "../../../Services/PostService";
import Navbar from "../../organisms/Navbar";

// Define the UpdatePost component.
const UpdatePost: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to handle form submission.
  const handleSubmit = async (values: {
    id: string;
    image: string;
    description: string;
    author_id: string;
    like_count: number;
  }) => {
    try {
      await PostService.updatePost(values); // Call the service to update the post.
      console.log("Post erfolgreich aktualisiert:", values); // Log success message (in German).
      navigate("/gallery"); // Navigate to the gallery page.
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Posts:", error); // Log any errors (in German).
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
