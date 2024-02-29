import { Paper, TextField, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../../../Services/UserService";
import Navbar from "../../../organisms/Navbar";
import { Role } from "../../../../types/models/Role.model";

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (values: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
  }) => {
    try {
      await UserService.updateUser(values);
      console.log("User erfolgreich aktualisiert:", values);
      navigate("/users");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Users:", error);
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
          email: location.state.email,
          firstName: location.state.firstName,
          lastName: location.state.lastName,
          roles: location.state.roles,
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
              value={props.values.email}
            />
            <TextField
              id="image"
              label="Image URL"
              placeholder="Enter the URL of the image"
              fullWidth
              onChange={props.handleChange}
              value={props.values.firstName}
            />
            <TextField
              id="image"
              label="Image URL"
              placeholder="Enter the URL of the image"
              fullWidth
              onChange={props.handleChange}
              value={props.values.lastName}
            />
            <TextField
              id="image"
              label="Image URL"
              placeholder="Enter the URL of the image"
              fullWidth
              onChange={props.handleChange}
              value={props.values.roles}
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

export default UpdateUser;
