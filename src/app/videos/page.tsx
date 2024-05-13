import React from "react";

import { Container, Typography, Box, Button } from "@mui/material";

export default function ComingSoon() {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          mt: 8,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          color="primary"
        >
          Coming Soon
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ maxWidth: 400, color: "white" }}
          paragraph
        >
          Video Page is under construction. We&apos;ll be here soon with our new
          awesome site.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" href="/">
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
}
