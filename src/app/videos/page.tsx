import React from "react";

import { Container, Typography, Box, Button } from "@mui/material";

import VideoPlayer from "@/components/videoPlayer";

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
        <VideoPlayer />
        <Box mt={4}>
          <Button variant="contained" color="primary" href="/">
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
}
