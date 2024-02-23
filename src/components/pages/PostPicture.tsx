import { Paper, Grid, TextField, Button, Input } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const PostPicture = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const navigate = useNavigate();
  const btnstyle = { margin: "8px 0" };

  const handleSubmit = (values: { image: string; description: string; author: string; author_id: number; like_count: number; }) => {
    console.log(values);
    navigate("/");
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
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Formik
          initialValues={{
            image: "",
            description: "",
            author: "",
            author_id: 0,
            like_count: 0
          }}
          enableReinitialize
          onSubmit={handleSubmit}
          validateOnChange
          isInitialValid
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Input type="file" name="image1" onChange={(event) => handleImageChange(event, props.setFieldValue)} />
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
                onClick={() => navigate('/gallery')}
              >
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default PostPicture;
