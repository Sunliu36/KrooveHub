"use client";

import React, { useState, useEffect, useRef } from "react";

import { Container, Grid, Paper } from "@mui/material";

import VideoList from "@/components/videoList";
import VideoPlayer from "@/components/videoPlayer";

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
  // Add more videos here
];

export default function VideoPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollDeltaRef = useRef<number>(0);
  const scrollThreshold = 100; // Adjust the threshold as needed

  const handleVideoSelect = (url: string | null) => {
    setSelectedVideo(url);
    scrollDeltaRef.current = 0; // Reset the scroll delta when a new video is selected
  };

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (selectedVideo) {
      scrollDeltaRef.current += event.deltaY;
    }
  };

  const handleMouseLeave = () => {
    if (selectedVideo && Math.abs(scrollDeltaRef.current) >= scrollThreshold) {
      const currentIndex = videoData.findIndex(
        (video) => video.url === selectedVideo,
      );
      if (scrollDeltaRef.current < 0 && currentIndex > 0) {
        setSelectedVideo(videoData[currentIndex - 1].url);
      } else if (
        scrollDeltaRef.current > 0 &&
        currentIndex < videoData.length - 1
      ) {
        setSelectedVideo(videoData[currentIndex + 1].url);
      }
      scrollDeltaRef.current = 0; // Reset the scroll delta after changing the video
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
      maxWidth={false}
      sx={{
        mb: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100vh",
        padding: 0,
      }}
      onWheel={handleScroll}
    >
      <Grid container sx={{ width: "100%" }}>
        {selectedVideo ? (
          <Grid item xs={12} sx={{ padding: 0, overflow: "hidden" }}>
            <Paper
              elevation={3}
              ref={containerRef}
              onMouseLeave={handleMouseLeave}
            >
              <VideoPlayer url={selectedVideo} onSelect={handleVideoSelect} />
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ padding: 0 }}>
            <Paper elevation={3}>
              <VideoList videos={videoData} onSelect={handleVideoSelect} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
