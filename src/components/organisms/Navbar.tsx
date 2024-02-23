import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
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
    );
  };
  
  export default Navbar;