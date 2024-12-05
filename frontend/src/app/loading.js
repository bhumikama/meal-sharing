// app/meals/loading.js
import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#29ade5"
    >
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
        Loading meals, please wait...
      </Typography>
    </Box>
  );
};

export default Loading;
