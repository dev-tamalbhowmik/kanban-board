import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <Box component="div" p={2}>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        Kanban Board {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default Footer;
