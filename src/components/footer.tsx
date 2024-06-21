import React from "react";

import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "inherit",
        color: "white",
        mt: 2,
        mb: 2,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" component="p">
          &copy; {new Date().getFullYear()} KrooveHub. All rights reserved.
        </Typography>
        <Typography variant="body2" component="p">
          <Link href="/privacy" color="inherit">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms" color="inherit">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
