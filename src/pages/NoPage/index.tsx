import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          height: "100vh",
          bgcolor: "#1d1d1d",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ color: "#04a51e", fontWeight: "bold" }}>404</Typography>
        <Typography variant="h5">Page Not Found</Typography>
        <Link to="/">
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              borderRadius: "20px",
              backgroundColor: "#04a51e",
              fontWeight: "bold",
              textTransform: "none",
              ":hover": { backgroundColor: "#04a51e" },
            }}
          >
            Go to Home
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NoPage;
