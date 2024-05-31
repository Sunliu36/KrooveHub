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

const VideoPlayer = () => {
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
  const [score, setScore] = useState<number>(0);
  const [style, api] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    scaleX: 1,
  }));
  const [anchorElOpacity, setAnchorElOpacity] = useState<HTMLElement | null>(
    null,
  );
  const [maskPhotoUrl, setMaskPhotoUrl] = useState<string | null>(null);
  const [maskPhoto2Url, setMaskPhoto2Url] = useState<string | null>(null);
  const loadBodyPixModel = async () => {
    const net = await bodyPix.load();
    setBodypixnet(net);
  };

  useEffect(() => {
    loadBodyPixModel();
  }, []);

  const handlePlayPause = () => {
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
      // Consider only the alpha channel for mask presence
      const isMasked1 = pixels1[i + 3] > 0;
      const isMasked2 = pixels2[i + 3] > 0;

      // Using bitwise AND to determine where both masks agree on having a mask
      if (!isMasked1 && !isMasked2) {
        matchCount++;
      }
      // Using bitwise OR to determine where either mask has a mask
      if (!isMasked1 || !isMasked2) {
        totalCount++;
      }
    }
    console.log("Match Count:", matchCount);
    console.log("Total Count:", totalCount);
    // Calculate the score as a percentage of matching areas to total possible mask areas
    if (totalCount === 0) return 0;
    const score = (matchCount / totalCount) * 100;
    return score;
  };

  const handlePopoverOpenOpacity = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOpacity(event.currentTarget);
  };

  const maskToImageUrl = (mask: ImageData) => {
    if (!mask) return null;

    // Create a canvas to draw the mask
    const canvas = document.createElement("canvas");
    canvas.width = mask.width;
    canvas.height = mask.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Draw the mask data onto the canvas
    ctx.putImageData(mask, 0, 0);

    // Convert the canvas to a data URL
    return canvas.toDataURL();
  };

  const handleCompareMasks = async () => {
    if (
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

    // Create canvases to match the display size of the video element
    const videoCanvas = document.createElement("canvas");
    videoCanvas.width = videoRect.width;
    videoCanvas.height = videoRect.height;

    const webcamCanvas = document.createElement("canvas");
    webcamCanvas.width = videoRect.width;
    webcamCanvas.height = videoRect.height;

    const videoCtx = videoCanvas.getContext("2d");
    const webcamCtx = webcamCanvas.getContext("2d");

    // Draw the video to fill the canvas
    videoCtx?.drawImage(
      videoRef.current,
      0,
      0,
      videoRect.width,
      videoRect.height,
    );

    const scale = webcamRect.height / webcamVideoHeight;
    const offsetX = (webcamVideoWidth * scale - webcamRect.width) / 2;
    console.log("Offset X:", offsetX);
    // Transform the webcam context to flip the webcam feed horizontally
    webcamCtx?.scale(-scale, scale); // Flip horizontally
    webcamCtx?.translate(-webcamVideoWidth + offsetX / scale, 0);

    // Draw the webcam feed, scaled and flipped
    webcamCtx?.drawImage(webcamRef.current, 0, 0);

    // Process both canvases with BodyPix
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

    // Calculate the matching score
    const score = compareMasks(videoMask, webcamMask);
    setScore(score);
    console.log("Score:", score);

    // Convert masks to image URLs
    const videoMaskUrl = maskToImageUrl(videoMask);
    const webcamMaskUrl = maskToImageUrl(webcamMask);
    setMaskPhotoUrl(videoMaskUrl);
    setMaskPhoto2Url(webcamMaskUrl);
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

  useEffect(() => {
    const interval = setInterval(() => {
      handleCompareMasks();
    }, 1000); // Update score every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodypixnet, webcamRef, videoRef, cameraEnabled]); // Rerun when dependencies change

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
          ref={webcamRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)", // Flip the camera view
            zIndex: 0,
            display: cameraEnabled ? "block" : "none",
          }}
          autoPlay
          muted
          playsInline
        ></video>
        {/* {maskPhoto2Url && (
          <img
            src={maskPhoto2Url}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 3,
              opacity: 0.5, // Adjust opacity to see video and mask
            }}
          />
        )} */}
        <animated.div
          style={{
            ...style,
            opacity: cameraEnabled ? opacity / 100 : 1,
            zIndex: 1,
            position: "relative",
          }}
        >
          <video
            ref={videoRef}
            style={{
              transformOrigin: "center",
              touchAction: "none",
              width: "100%",
              height: "100%",
            }}
            controls={false}
            playsInline
            muted
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* {maskPhotoUrl && (
            <img
              src={maskPhotoUrl}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 3,
                opacity: 0.5, // Adjust opacity to see video and mask
              }}
            />
          )} */}
        </animated.div>
        {!isPlaying && (
          <IconButton
            color="primary"
            onClick={handlePlayPause}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              borderRadius: "20%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              "&:hover": {
                backgroundColor: "green",
              },
              ":disabled": {
                backgroundColor: "gray",
                color: "white",
              },
            }}
            disabled={!cameraEnabled}
          >
            {countdown > 0
              ? countdown
              : cameraEnabled
                ? "Keep Play"
                : "Open Camera"}{" "}
          </IconButton>
        )}
      </Box>
      <Box className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-center items-center space-x-2">
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
      <Box sx={{ mt: 2, color: "white" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCompareMasks}
        >
          Score: {score.toFixed(2)}
        </Button>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
