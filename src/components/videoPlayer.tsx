"use client";

import { useRef, useState } from "react";

import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import RotateRightIcon from '@mui/icons-material/RotateRight';
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {
  Box,
  MenuItem,
  Select,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);

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
    if (videoRef.current) {
      setIsMirrored(!isMirrored);
      const video = videoRef.current;
      video.style.transform = isMirrored
        ? `scale(${scale})`
        : `scale(-${scale}, ${scale})`;
    }
  };

  const handleRotate = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const currentRotation = video.style.transform.match(/rotate\((\d+)deg\)/);
      const currentAngle = currentRotation ? parseInt(currentRotation[1]) : 0;
      video.style.transform = `rotate(${(currentAngle + 90) % 360}deg) scale(${scale}) ${isMirrored ? "scaleX(-1)" : ""}`;
    }
  };

  const handleZoomIn = () => {
    setScale((prevScale) => {
      const newScale = prevScale + 0.1;
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${newScale}) ${isMirrored ? "scaleX(-1)" : ""}`;
      }
      return newScale;
    });
  };

  const handleZoomOut = () => {
    setScale((prevScale) => {
      const newScale = prevScale - 0.1;
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${newScale}) ${isMirrored ? "scaleX(-1)" : ""}`;
      }
      return newScale;
    });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <video ref={videoRef} width="600" controls>
        <source src="/sample-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Box sx={{ mt: 2 }}>
        <IconButton color="primary" onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Select
          value={playbackRate}
          onChange={handleSpeedChange}
          displayEmpty
          inputProps={{ "aria-label": "Speed" }}
          sx={{ ml: 2, mr: 2, color: "white" }}
        >
          <MenuItem value={0.5}>0.5x</MenuItem>
          <MenuItem value={1}>1x</MenuItem>
          <MenuItem value={1.5}>1.5x</MenuItem>
          <MenuItem value={2}>2x</MenuItem>
        </Select>
        <IconButton sx={{ color: "white" }} onClick={handleMirror}>
          <FlipCameraAndroidIcon />
        </IconButton>
        {/* <IconButton sx={{ color: 'white', ml: 2 }} onClick={handleRotate}>
          <RotateRightIcon />
        </IconButton> */}
        <IconButton sx={{ color: "white", ml: 2 }} onClick={handleZoomIn}>
          <ZoomInIcon />
        </IconButton>
        <IconButton sx={{ color: "white", ml: 2 }} onClick={handleZoomOut}>
          <ZoomOutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
