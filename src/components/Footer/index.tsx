import { GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          padding: "10px",
          bgcolor: "#262626",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
            gap: "10px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Typography variant="body2">
              Develop by Fadhli Fajarsyah ●
            </Typography>
            <Link href="https://github.com/fadhli089fajarsyah">
              <GitHub fontSize="small" />
            </Link>
            <Link href="https://www.linkedin.com/in/fadhlifajarsyah/">
              <LinkedIn fontSize="small" />
            </Link>
            <Link href="https://www.instagram.com/fadhli_._/">
              <Instagram fontSize="small" />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-5px",
              gap: "5px",
            }}
          >
            <Typography variant="caption" sx={{ color: "#b2b2b2" }}>
              Powered by
            </Typography>
            <Typography variant="caption" sx={{ color: "#b2b2b2" }}>
              Dumbways Indonesia ● #1 Coding Bootcamp
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
