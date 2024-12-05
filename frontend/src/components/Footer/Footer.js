// FooterMUI.jsx
import React from "react";
import { Container, Typography, Link, Box, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material"; // Import social media icons

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#29ade5", color: "white", py: 3, mt: 3 }}>
      <Container maxWidth="lg">
        {/* Social media icons section */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            sx={{
              color: "white",
              "&:hover": { color: "#3b5998" },
              fontSize: "1.5rem",
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            sx={{
              color: "white",
              "&:hover": { color: "#1da1f2" },
              fontSize: "1.5rem",
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            href="https://www.instagram.com"
            target="_blank"
            sx={{
              color: "white",
              "&:hover": { color: "#e1306c" },
              fontSize: "1.5rem",
            }}
          >
            <Instagram />
          </IconButton>
        </Box>

        {/* Footer bottom section with copyright */}
        <Typography variant="body2" textAlign="center">
          © {new Date().getFullYear()} MealShare. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
