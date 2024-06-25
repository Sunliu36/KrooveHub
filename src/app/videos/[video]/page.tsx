"use client";

import React from "react";

import { useParams } from "next/navigation";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, Box, Link, IconButton } from "@mui/material";

import VideoPlayer from "@/components/videosPlayer";

export default function ComingSoon() {
  const { video } = useParams();
  console.log(video);
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <VideoPlayer url={`/${video}.mp4`} />
      <Box
        sx={{
          position: "absolute",
          top: 80,
          left: 10,
          backgroundColor: "transparent",
          zIndex: 3,
        }}
      >
        <Link href="/videos">
          <IconButton sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Box>
    </Container>
  );
}
