import React from "react";

import { Container } from "@mui/material";

import VideoPlayer from "@/components/videoPlayer";

export default function ComingSoon() {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <VideoPlayer />
      </Container>
    </>
  );
}
