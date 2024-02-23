import logo from "../../logo1.png";
import { useContext } from "react";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import { Link } from "react-router-dom";
import { Button, Grid, Box, Typography } from "@mui/material";
import Navbar from "../organisms/Navbar";

export default function HomePage() {
  const context = useContext(ActiveUserContext);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
      sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Typography variant="h2" component="div" gutterBottom>
        Welcome to the Homepage
      </Typography>
      <img
        src={logo}
        style={{ filter: "invert(100%)", marginBottom: "2rem" }}
        className="App-logo"
        alt="logo"
      />
      <Navbar />
    </Box>
  );
}
