import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, Box, Link, IconButton } from "@mui/material";

import ScorePlayer from "@/components/scorePlayer";

export default function ComingSoon() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mb: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ScorePlayer />
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
