"use client";

import React, { useRef, useState, useEffect } from "react";

import { useParams } from "next/navigation";

import CameraIcon from "@mui/icons-material/Camera";
import OpacityIcon from "@mui/icons-material/Opacity";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  IconButton,
  Slider,
  Popover,
  Typography,
  Button,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-core";

const ScorePlayer = () => {
  const { mp4 } = useParams();
  const [countdown, setCountdown] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bodypixnet, setBodypixnet] = useState<bodyPix.BodyPix | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string>(`/${mp4}.mp4`);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(20);
  const [scores, setScores] = useState<number[]>([]);
  const [style, api] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    scaleX: 1,
  }));
  const [anchorElOpacity, setAnchorElOpacity] = useState<HTMLElement | null>(
    null,
  );

  const loadBodyPixModel = async () => {
    const net = await bodyPix.load();
    setBodypixnet(net);
  };

  useEffect(() => {
    loadBodyPixModel();
  }, []);

  const handlePlayPause = () => {
    if (!cameraEnabled) {
      handleBackgroundRemoval();
      return;
    }
    if (videoRef.current) {
      if (videoRef.current.paused && countdown === 0) {
        setCountdown(3); // Start countdown from 3 seconds
        let timer = 3;
        const countdownInterval = setInterval(() => {
          timer -= 1;
          setCountdown(timer);
          if (timer === 0 && videoRef.current) {
            clearInterval(countdownInterval);
            videoRef.current.play();
            setIsPlaying(true);
            setCountdown(0); // Reset countdown
          }
        }, 1000);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleBackgroundRemoval = async () => {
    if (cameraEnabled) {
      const stream = webcamRef.current?.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setCameraEnabled(false);
      return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
          setCameraEnabled(true);
        }
      } catch (error) {
        console.error("Error accessing camera for background removal:", error);
      }
    }
  };

  const compareMasks = (mask1: ImageData, mask2: ImageData) => {
    const pixels1 = mask1.data;
    const pixels2 = mask2.data;
    let matchCount = 0;
    let totalCount = 0;

    for (let i = 0; i < pixels1.length; i += 4) {
      const isMasked1 = pixels1[i + 3] > 0;
      const isMasked2 = pixels2[i + 3] > 0;

      if (!isMasked1 && !isMasked2) {
        matchCount++;
      }
      if (!isMasked1 || !isMasked2) {
        totalCount++;
      }
    }

    if (totalCount === 0) return 0;
    const score = (matchCount / totalCount) * 100;
    return score;
  };

  const handlePopoverOpenOpacity = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOpacity(event.currentTarget);
  };

  const maskToImageUrl = (mask: ImageData) => {
    if (!mask) return null;

    const canvas = document.createElement("canvas");
    canvas.width = mask.width;
    canvas.height = mask.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.putImageData(mask, 0, 0);

    return canvas.toDataURL();
  };

  const handleCompareMasks = async () => {
    if (
      !isPlaying ||
      !bodypixnet ||
      !webcamRef.current ||
      !videoRef.current ||
      !cameraEnabled
    )
      return;

    const videoRect = videoRef.current.getBoundingClientRect();
    const webcamRect = webcamRef.current.getBoundingClientRect();
    const webcamVideoHeight = webcamRef.current.videoHeight;
    const webcamVideoWidth = webcamRef.current.videoWidth;

    const videoCanvas = document.createElement("canvas");
    videoCanvas.width = videoRect.width;
    videoCanvas.height = videoRect.height;

    const webcamCanvas = document.createElement("canvas");
    webcamCanvas.width = videoRect.width;
    webcamCanvas.height = videoRect.height;

    const videoCtx = videoCanvas.getContext("2d");
    const webcamCtx = webcamCanvas.getContext("2d");

    videoCtx?.drawImage(
      videoRef.current,
      0,
      0,
      videoRect.width,
      videoRect.height,
    );

    const scale = webcamRect.height / webcamVideoHeight;
    const offsetX = (webcamVideoWidth * scale - webcamRect.width) / 2;

    webcamCtx?.scale(-scale, scale);
    webcamCtx?.translate(-webcamVideoWidth + offsetX / scale, 0);

    webcamCtx?.drawImage(webcamRef.current, 0, 0);

    const videoSegmentation = await bodypixnet.segmentPerson(videoCanvas, {
      internalResolution: "medium",
      segmentationThreshold: 0.6,
    });
    const webcamSegmentation = await bodypixnet.segmentPerson(webcamCanvas, {
      internalResolution: "medium",
      segmentationThreshold: 0.6,
    });

    const videoMask = bodyPix.toMask(videoSegmentation);
    const webcamMask = bodyPix.toMask(webcamSegmentation);
    const score = compareMasks(videoMask, webcamMask);
    setScores((prevScores) => [...prevScores, score]);
  };

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

  const averageScore =
    scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      handleCompareMasks();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, bodypixnet, webcamRef, videoRef, cameraEnabled]);

  return (
    <Box
      sx={{
        mt: 7,
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
          maxHeight: "auto",
        }}
      >
        <video
          ref={webcamRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)",
            zIndex: 0,
            display: cameraEnabled ? "block" : "none",
          }}
          autoPlay
          muted
          playsInline
        ></video>
        <animated.div
          style={{
            ...style,
            opacity: cameraEnabled ? opacity / 100 : 1,
            zIndex: 1,
          }}
        >
          <video
            ref={videoRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            controls={false}
            playsInline
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </animated.div>
        {!isPlaying && (
          <IconButton
            color="primary"
            onClick={cameraEnabled ? handlePlayPause : handleBackgroundRemoval}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              borderRadius: "20%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              backgroundColor: "gray",
              opacity: 0.8,
              color: "white",
              padding: "10px",
              "&:hover": {
                backgroundColor: "gray",
                opacity: 0.8,
              },
            }}
          >
            {countdown > 0
              ? countdown
              : cameraEnabled
                ? "Start Playing"
                : "Open Camera"}
          </IconButton>
        )}
      </Box>
      <Box className="fixed bottom-0 left-0 right-0 bg-black z-10 p-2 flex justify-center items-center space-x-2">
        <IconButton sx={{ color: "white" }} onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={handleBackgroundRemoval}>
          <CameraIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={handlePopoverOpenOpacity}>
          <OpacityIcon />
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
      </Box>
      <Box sx={{ mt: 4, color: "white" }}>
        <Button
          variant="contained"
          onClick={handleCompareMasks}
          sx={{ backgroundColor: "#EF42B4" }}
        >
          Average Score: {averageScore.toFixed(2)}
        </Button>
      </Box>
    </Box>
  );
};

export default ScorePlayer;
