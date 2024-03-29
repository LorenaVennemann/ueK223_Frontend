import { Box, Typography } from "@mui/material";
import Navbar from "../../organisms/Navbar";
import Logo from "../../atoms/Logo";

// Define HomePage functional component
export default function HomePage() {
  return (

    // Box component acting like a container with flex display to center its children.
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
      sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Typography variant="h2" component="div" gutterBottom>
        Welcome to the
      </Typography>
      <Logo />
      <Navbar />
    </Box>
  );
}