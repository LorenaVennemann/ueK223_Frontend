import { Paper, Grid, TextField, Button, Input } from "@mui/material";

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string(),
});

const DisplayGallery = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      
    </Grid>
  );
};

export default DisplayGallery;
