import { Paper, Grid, TextField, Button, Input } from "@mui/material";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import PostService from "../../Services/PostService";

function genUniqueId(): string {
  const dateStr = Date.now().toString(36); 

  const randomStr = Math.random().toString(36).substring(2, 8); 

  return `${dateStr}-${randomStr}`;
}

const PostPicture = () => {
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
    image: "";
    description: "";
    author: "";
    author_id: 0;
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

  const handleImageChange = (event: any, setFieldValue: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <Formik
        initialValues={{
          id: genUniqueId(),
          image: "",
          description: "",
          author: "",
          author_id: 0,
          like_count: 0,
        }}
        enableReinitialize
        onSubmit={handleSubmit}
        validateOnChange
        isInitialValid
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Input
              type="file"
              name="image1"
              onChange={(event) =>
                handleImageChange(event, props.setFieldValue)
              }
            />
            {props.errors.image && (
              <div id="feedback">{props.errors.image}</div>
            )}

            <TextField
              id="author"
              label="author name"
              placeholder="Enter the name of the author"
              fullWidth
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.author}
            />
            {props.errors.author && (
              <div id="feedback">{props.errors.author}</div>
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
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" component={Link} to="/">
                  Home
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" component={Link} to="/post">
                  Post
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" component={Link} to="/gallery">
                  Gallery
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default PostPicture;
