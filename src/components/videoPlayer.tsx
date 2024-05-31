"use client";

import React, { useRef, useState, useEffect } from "react";

import CameraIcon from "@mui/icons-material/Camera";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import SwitchVideoIcon from "@mui/icons-material/SwitchVideo";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  MenuItem,
  Select,
  IconButton,
  SelectChangeEvent,
  Slider,
  Popover,
  Typography,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string>("/sample-video.mp4");
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(20);
  const [style, api] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    scaleX: 1,
  }));

  const [anchorElOpacity, setAnchorElOpacity] = useState<HTMLElement | null>(
    null,
  );

  useGesture(
    {
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s],
        memo,
      }) => {
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

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current) {
        const elem = containerRef.current;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        }
        setIsFullscreen(true);
        // Reset zoom and drag when entering fullscreen
        api.start({ scale: 1, x: 0, y: 0 });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleVideoSwitch = () => {
    const newVideo =
      currentVideo === "/sample-video.mp4"
        ? "/sample-video2.mp4"
        : "/sample-video.mp4";
    setCurrentVideo(newVideo);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  const handleBackgroundRemoval = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOpacity(event.currentTarget);
    if (!cameraEnabled) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            if (cameraRef.current) {
              cameraRef.current.srcObject = stream;
              cameraRef.current.play();
              setCameraEnabled(true);
            }
          })
          .catch((error) => {
            console.error(
              "Error accessing camera for background removal:",
              error,
            );
          });
      }
    } else {
      if (cameraRef.current && cameraRef.current.srcObject) {
        const stream = cameraRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        cameraRef.current.srcObject = null;
        setCameraEnabled(false);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        const videoAspectRatio =
          videoRef.current.videoWidth / videoRef.current.videoHeight;
        const container = containerRef.current;
        if (container) {
          container.style.width = `${container.clientHeight * videoAspectRatio}px`;
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set size based on video aspect ratio
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (videoElement) {
      videoElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [videoRef]);

  const handleUploadVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      setCurrentVideo(url);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }
  };

  const handleOpacityChange = (event: Event, newValue: number | number[]) => {
    setOpacity(newValue as number);
  };

  const handlePopoverCloseOpacity = () => {
    setAnchorElOpacity(null);
  };
  const openOpacity = Boolean(anchorElOpacity);

  return (
    <Box
      sx={{
        textAlign: "center",
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
      ref={containerRef}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "inline-block",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          maxWidth: "600px",
          maxHeight: "auto",
        }}
      >
        <video
          ref={cameraRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)", // Add this line to flip the camera view
            zIndex: 0,
            display: cameraEnabled ? "block" : "none",
          }}
          autoPlay
          muted
          webkit-playsinline="true"
          playsInline
        ></video>
        <animated.div
          style={{
            ...style,
            opacity: cameraEnabled ? opacity / 100 : 100,
            zIndex: 1,
            position: "relative",
          }}
        >
          <video
            autoPlay
            ref={videoRef}
            style={{
              transformOrigin: "center",
              touchAction: "none",
              width: "100%",
              height: "100%",
            }}
            controls={false}
            webkit-playsinline="true"
            playsInline
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </animated.div>
        <IconButton
          sx={{
            position: "absolute",
            top: 8, // Adjust top spacing
            right: 8, // Adjust right spacing
            zIndex: 3, // Make it appear on top of other elements
            borderRadius: "50%", // Make it circular
            color: "white", // Set icon color
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background color
          }}
          onClick={() => {
            // go to score page
            window.location.href = `/score${currentVideo.replace(".mp4", "")}`;
          }}
        >
          {" "}
          <SportsScoreIcon />{" "}
        </IconButton>
        {!isPlaying && (
          <IconButton
            color="primary"
            onClick={handlePlayPause}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
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
        <IconButton sx={{ color: "white" }} onClick={handleFullscreen}>
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={handleVideoSwitch}>
          <SwitchVideoIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={handleBackgroundRemoval}>
          <CameraIcon />
        </IconButton>
        <input
          accept="video/*"
          style={{ display: "none" }}
          id="upload-video"
          type="file"
          onChange={handleUploadVideo}
        />
        <label htmlFor="upload-video">
          <IconButton sx={{ color: "white" }} component="span">
            <UploadFileIcon />
          </IconButton>
        </label>
        <Popover
          open={openOpacity && cameraEnabled}
          anchorEl={anchorElOpacity}
          onClose={handlePopoverCloseOpacity}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Opacity
            </Typography>
            <Slider
              value={opacity}
              onChange={handleOpacityChange}
              aria-labelledby="opacity-slider"
              min={0}
              max={100}
              sx={{ width: 150, color: "gray" }}
            />
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
