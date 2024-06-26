"use client";

import React, { useState, useEffect, useRef } from "react";

import { Container, Grid, Paper } from "@mui/material";

import VideoList from "@/components/videoList";

const videoData = [
  { title: "Video", url: "/sample-video4.mp4" },
  { title: "Vivian", url: "/sample-video3.mp4" },
  { title: "Paul", url: "/sample-video4.mp4" },
  { title: "XueDAO", url: "/sample-video3.mp4" },
  { title: "Shefi", url: "/sample-video2.mp4" },
  { title: "Who", url: "/sample-video2.mp4" },
  { title: "Name", url: "/sample-video1.mp4" },
  { title: "Ali", url: "/sample-video3.mp4" },
  { title: "Second", url: "/sample-video2.mp4" },
  { title: "Teice", url: "/sample-video2.mp4" },
  { title: "Alice", url: "/sample-video1.mp4" },
  { title: "Video", url: "/sample-video4.mp4" },
  { title: "Vivian", url: "/sample-video3.mp4" },
  { title: "Paul", url: "/sample-video4.mp4" },
  { title: "XueDAO", url: "/sample-video3.mp4" },
  { title: "Shefi", url: "/sample-video2.mp4" },
  { title: "Second", url: "/sample-video2.mp4" },
  { title: "Teice", url: "/sample-video2.mp4" },
  { title: "Alice", url: "/sample-video1.mp4" },
  { title: "Teice", url: "/sample-video2.mp4" },
  { title: "Alice", url: "/sample-video1.mp4" },
];

function VideoSquare() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const scrollDeltaRef = useRef<number>(0);

  const handleVideoSelect = (url: string | null) => {
    setSelectedVideo(url);
    scrollDeltaRef.current = 0; // Reset the scroll delta when a new video is selected
  };

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (selectedVideo) {
      scrollDeltaRef.current += event.deltaY;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedVideo) {
        const currentIndex = videoData.findIndex(
          (video) => video.url === selectedVideo,
        );
        if (event.key === "ArrowUp" && currentIndex > 0) {
          setSelectedVideo(videoData[currentIndex - 1].url);
        } else if (
          event.key === "ArrowDown" &&
          currentIndex < videoData.length - 1
        ) {
          setSelectedVideo(videoData[currentIndex + 1].url);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100vh",
        width: "100%",
        padding: 0,
      }}
      onWheel={handleScroll}
    >
      <Grid container>
        <Grid item xs={12} sx={{ padding: 0, mb: 7 }}>
          <Paper elevation={3}>
            <VideoList videos={videoData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
export default VideoSquare;
