"use client";

import React, { useRef, useState } from "react";

import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {
  Box,
  MenuItem,
  Select,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [style, api] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    scaleX: 1,
  }));

  const disableScroll = () => {
    document.body.classList.add("no-scroll");
  };

  const enableScroll = () => {
    document.body.classList.remove("no-scroll");
  };

  useGesture(
    {
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s],
        memo,
      }) => {
        disableScroll();
        if (first) {
          const { width, height, x, y } =
            videoRef.current!.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        const x = memo[0] - (ms - 1) * memo[2];
        const y = memo[1] - (ms - 1) * memo[3];
        api.start({ scale: s, x, y });
        return memo;
      },
      onPinchEnd: () => {
        enableScroll();
      },
      onDrag: ({ pinching, cancel, offset: [x, y] }) => {
        if (pinching) return cancel();
        api.start({ x, y });
      },
    },
    {
      target: videoRef,
      eventOptions: { passive: false },
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    },
  );

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSpeedChange = (event: SelectChangeEvent<number>) => {
    const rate = Number(event.target.value);
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleMirror = () => {
    setIsMirrored((prev) => !prev);
    api.start({ scaleX: isMirrored ? 1 : -1 });
  };

  const handleZoomIn = () => {
    const newScale = Math.min(scale + 0.1, 4); // Limit the maximum scale
    setScale(newScale);
    api.start({ scale: newScale });
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.1, 1); // Limit the minimum scale
    setScale(newScale);
    api.start({ scale: newScale });
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current) {
        const elem = containerRef.current;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        }
        setIsFullscreen(true);
        // Reset zoom and drag when entering fullscreen
        setScale(1);
        api.start({ scale: 1, x: 0, y: 0 });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }} ref={containerRef} className="relative">
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
        }}
      >
        <animated.div style={{ ...style }}>
          <video
            autoPlay
            ref={videoRef}
            width="600"
            style={{ transformOrigin: "center", touchAction: "none" }}
          >
            <source src="/sample-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </animated.div>
        {!isPlaying && (
          <IconButton
            color="primary"
            onClick={handlePlayPause}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <PlayArrowIcon />
          </IconButton>
        )}
      </Box>
      <Box className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-center items-center space-x-2">
        <IconButton sx={{ color: "white" }} onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Select
          value={playbackRate}
          onChange={handleSpeedChange}
          displayEmpty
          inputProps={{ "aria-label": "Speed" }}
          sx={{ color: "white" }}
        >
          <MenuItem value={0.25}>0.25x</MenuItem>
          <MenuItem value={0.5}>0.5x</MenuItem>
          <MenuItem value={0.75}>0.75x</MenuItem>
          <MenuItem value={1}>1x</MenuItem>
          <MenuItem value={1.2}>1.2x</MenuItem>
        </Select>
        <IconButton sx={{ color: "white" }} onClick={handleMirror}>
          <FlipCameraAndroidIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={handleZoomIn}>
          <ZoomInIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={handleZoomOut}>
          <ZoomOutIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={handleFullscreen}>
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
