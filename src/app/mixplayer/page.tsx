"use client";

import React, { useRef, useState, useEffect } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import OpacityIcon from "@mui/icons-material/Opacity";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
  Button,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const topVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string>("");
  const [overlayVideo, setOverlayVideo] = useState<string>("");
  const [currentVideoFileName, setCurrentVideoFileName] = useState("");
  const [overlayVideoFileName, setOverlayVideoFileName] = useState("");
  const [opacity, setOpacity] = useState<number>(50);
  const [currentTime1, setCurrentTime1] = useState<number>(0);
  const [currentTime2, setCurrentTime2] = useState<number>(0);
  const [duration1, setDuration1] = useState<number>(100); // Default max duration for slider
  const [duration2, setDuration2] = useState<number>(100); // Default max duration for slider
  const [showUpload, setShowUpload] = useState(true);
  const [anchorElOpacity, setAnchorElOpacity] = useState<HTMLElement | null>(
    null,
  );
  const [anchorElTime, setAnchorElTime] = useState<HTMLElement | null>(null);
  const [style, api] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    scaleX: 1,
  }));

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
            topVideoRef.current!.getBoundingClientRect();
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
      target: topVideoRef,
      eventOptions: { passive: false },
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    },
  );

  const handlePlayPause = () => {
    if (videoRef.current && topVideoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        topVideoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        topVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSpeedChange = (event: SelectChangeEvent<number>) => {
    const rate = Number(event.target.value);
    setPlaybackRate(rate);
    if (videoRef.current && topVideoRef.current) {
      videoRef.current.playbackRate = rate;
      topVideoRef.current.playbackRate = rate;
    }
  };

  const handleMirror = () => {
    setIsMirrored((prev) => !prev);
    api.start({ scaleX: isMirrored ? 1 : -1 });
  };

  const handleUploadVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileURL = URL.createObjectURL(event.target.files[0]);
      setCurrentVideo(fileURL);
      setCurrentVideoFileName(event.target.files[0].name);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }
  };

  const handleToggle = () => {
    setShowUpload((prev) => !prev);
  };

  const handleUploadOverlayVideo = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const fileURL = URL.createObjectURL(event.target.files[0]);
      setOverlayVideo(fileURL);
      setOverlayVideoFileName(event.target.files[0].name);
      if (topVideoRef.current) {
        topVideoRef.current.load();
        topVideoRef.current.play();
      }
    }
  };

  const handleTimeChange1 = (event: Event, newValue: number | number[]) => {
    if (videoRef.current) {
      setDuration1(videoRef.current.duration);
      const newTime = newValue as number;
      videoRef.current.currentTime = newTime;
      setCurrentTime1(newTime);
    }
  };

  const handleTimeChange2 = (event: Event, newValue: number | number[]) => {
    if (topVideoRef.current) {
      setDuration2(topVideoRef.current.duration);
      const newTime = newValue as number;
      topVideoRef.current.currentTime = newTime;
      setCurrentTime2(newTime);
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

  const handleOpacityChange = (event: Event, newValue: number | number[]) => {
    setOpacity(newValue as number);
  };

  const handlePopoverOpenOpacity = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOpacity(event.currentTarget);
  };

  const handlePopoverCloseOpacity = () => {
    setAnchorElOpacity(null);
  };

  const handlePopoverOpenTime = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTime(event.currentTarget);
  };

  const handlePopoverCloseTime = () => {
    setAnchorElTime(null);
  };

  const truncateFileName = (fileName: string, length = 6) => {
    if (fileName.length <= length * 2) {
      return fileName;
    }
    return `${fileName.substring(0, length)}...${fileName.substring(
      fileName.length - length,
    )}`;
  };

  const openOpacity = Boolean(anchorElOpacity);
  const openTime = Boolean(anchorElTime);

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
          top: 0,
          left: 0,
          zIndex: 3,
        }}
      >
        <IconButton onClick={handleToggle} sx={{ color: "white" }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      {(!currentVideo || !overlayVideo || showUpload) && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 2,
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "4rem" },
              fontWeight: "bold",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Upload Video
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.5rem" },
              fontWeight: "bold",
              color: "white",
              marginBottom: "2rem",
            }}
          >
            Please upload both template and your own video.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginRight: { xs: 0, md: "2rem" },
              }}
            >
              <input
                accept="video/*"
                style={{ display: "none" }}
                id="upload-video"
                type="file"
                onChange={handleUploadVideo}
              />
              <label htmlFor="upload-video">
                <IconButton sx={{ color: "white" }} component="span">
                  <UploadFileIcon sx={{ fontSize: "5rem" }} />
                </IconButton>
              </label>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Template
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {currentVideoFileName
                  ? truncateFileName(currentVideoFileName)
                  : "No Video Selected"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: { xs: 0, md: "2rem" },
              }}
            >
              <input
                accept="video/*"
                style={{ display: "none" }}
                id="upload-overlay-video"
                type="file"
                onChange={handleUploadOverlayVideo}
              />
              <label htmlFor="upload-overlay-video">
                <IconButton sx={{ color: "white" }} component="span">
                  <UploadFileIcon sx={{ fontSize: "5rem" }} />
                </IconButton>
              </label>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Own Video
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {overlayVideoFileName
                  ? truncateFileName(overlayVideoFileName)
                  : "No Video Selected"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "2rem",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                width: "150px",
                height: "50px",
                borderRadius: "25px",
                marginTop: "2rem",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid white",
                },
                "&:disabled": {
                  backgroundColor: "gray",
                  color: "white",
                  cursor: "not-allowed",
                },
              }}
              onClick={handleToggle}
              disabled={true}
            >
              Coming soon
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                width: "150px",
                height: "50px",
                borderRadius: "25px",
                marginTop: "2rem",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid white",
                },
                "&:disabled": {
                  backgroundColor: "gray",
                  color: "white",
                  cursor: "not-allowed",
                },
              }}
              onClick={handleToggle}
              disabled={!currentVideo || !overlayVideo}
            >
              疊影
            </Button>
          </Box>
        </Box>
      )}

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
          maxWidth: "1600px",
          maxHeight: "auto",
        }}
      >
        {currentVideo && overlayVideo && !showUpload && (
          <>
            <video
              ref={videoRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
              autoPlay
              muted
              webkit-playsinline="true"
              playsInline
            >
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <animated.div
              style={{
                ...style,
                opacity: opacity / 100,
                zIndex: 1,
                position: "relative",
              }}
            >
              <video
                ref={topVideoRef}
                style={{
                  transformOrigin: "center",
                  touchAction: "none",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                autoPlay
                muted
                webkit-playsinline="true"
                playsInline
                controls={false}
              >
                <source src={overlayVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </animated.div>

            <Box className="fixed bottom-0 left-0 right-0 bg-black p-2 flex justify-center items-center space-x-2">
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
              <IconButton
                sx={{ color: "white" }}
                onClick={handlePopoverOpenOpacity}
              >
                <OpacityIcon />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                onClick={handlePopoverOpenTime}
              >
                <AccessTimeIcon />
              </IconButton>
            </Box>
            <Popover
              open={openOpacity}
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
            <Popover
              open={openTime}
              anchorEl={anchorElTime}
              onClose={handlePopoverCloseTime}
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
                  Template
                </Typography>
                <Slider
                  value={currentTime1}
                  onChange={handleTimeChange1}
                  aria-labelledby="time-slider1"
                  min={0}
                  max={duration1}
                  sx={{ width: 150, color: "gray" }}
                />
                <Typography variant="h6" gutterBottom>
                  Own Video
                </Typography>
                <Slider
                  value={currentTime2}
                  onChange={handleTimeChange2}
                  aria-labelledby="time-slider2"
                  min={0}
                  max={duration2}
                  sx={{ width: 150, color: "gray" }}
                />
              </Box>
            </Popover>
          </>
        )}
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
    </Box>
  );
};

export default VideoPlayer;
