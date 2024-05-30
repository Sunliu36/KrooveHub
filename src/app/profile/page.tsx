"use client";

import React, { useState, useRef } from "react";

import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import BackIcon from "@mui/icons-material/ArrowBack";
import FlipIcon from "@mui/icons-material/Flip";
import OpacityIcon from "@mui/icons-material/Opacity";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SwitchVideoIcon from "@mui/icons-material/SwitchVideo";
import TimerIcon from "@mui/icons-material/Timer";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Slider,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

interface JoinedClass {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

interface UserProfile {
  handle: string;
  name: string;
  description: string;
  photo: string;
  videos: { url: string; description: string; template?: string }[];
  followers: number;
  following: number;
  joinedClasses: JoinedClass[];
  tags: { url: string; description: string }[];
}

// Mock data for user profile and joined classes
const userProfile: UserProfile = {
  handle: "@UnknownDancer",
  name: "UnKnown Dancer",
  description: "Professional dancer and choreographer",
  photo: "/profile-photo.jpg", // Make sure to place a photo at this path or update with the correct path
  videos: [
    {
      url: "/sample-video3.mp4",
      description: "Sample Video 1",
      template: "/sample-video2.mp4",
    },
    { url: "/sample-video2.mp4", description: "Sample Video 2" },
    { url: "/sample-video.mp4", description: "Sample Video 3" },
  ],
  followers: 1200,
  following: 300,
  joinedClasses: [
    {
      id: 1,
      title: "Advanced Ballet",
      date: "TUE, 6:00-7:00PM",
      imageUrl: "/kpop1.png",
    },
    {
      id: 2,
      title: "Hip Hop Basics",
      date: "SAT, 12:00-1:00PM",
      imageUrl: "/kpop2.png",
    },
    {
      id: 3,
      title: "Jazz Funk",
      date: "THU, 4:00-5:00PM",
      imageUrl: "/kpop3.png",
    },
  ],
  tags: [
    { url: "/sample-video3.mp4", description: "Tag Video 1" },
    { url: "/sample-video2.mp4", description: "Tag Video 2" },
    { url: "/sample-video.mp4", description: "Tag Video 3" },
  ],
};

const Profile: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [tabValue, setTabValue] = useState("videos");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    url: string;
    description: string;
    template?: string;
  } | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoOverlap, setVideoOverlap] = useState<boolean>(false);
  const [overlapUrl, setOverlapUrl] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(20);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [overlapTime, setOverlapTime] = useState<number>(0);
  const [showOpacitySlider, setShowOpacitySlider] = useState<boolean>(false);
  const [showTimeSlider, setShowTimeSlider] = useState<boolean>(false);
  const [style, api] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    scaleX: 1,
  }));
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlapVideoRef = useRef<HTMLVideoElement>(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (content: {
    url: string;
    description: string;
    template?: string;
  }) => {
    setDialogContent(content);
    setOpenDialog(true);
    setIsPlaying(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent(null);
    setComments([]);
    setVideoOverlap(false);
    setOverlapUrl(null);
    setShowOpacitySlider(false);
    setShowTimeSlider(false);
  };

  const handleAddComment = () => {
    const commentInput = document.getElementById("comment") as HTMLInputElement;
    if (commentInput) {
      const commentValue = commentInput.value;
      setComments((prevComments) => [...prevComments, commentValue]);
      commentInput.value = ""; // Clear the input after adding the comment
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (overlapVideoRef.current) {
          overlapVideoRef.current.pause();
        }
      } else {
        videoRef.current.play();
        if (overlapVideoRef.current) {
          overlapVideoRef.current.play();
        }
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleVideoOverlap = (url: string) => {
    if (!url) return;
    if (videoOverlap) {
      setOverlapUrl(null);
      setVideoOverlap(false);
    } else {
      setOverlapUrl(url);
      setVideoOverlap(true);
    }
  };

  const handleMirror = () => {
    setIsMirrored((prev) => !prev);
    api.start({ scaleX: isMirrored ? 1 : -1 });
  };

  const handleOpacityChange = (event: Event, newValue: number | number[]) => {
    setOpacity(newValue as number);
  };

  const handleTimeChange = (event: Event, newValue: number | number[]) => {
    setCurrentTime(newValue as number);
    if (videoRef.current) {
      videoRef.current.currentTime = newValue as number;
    }
  };

  const handleOverlapTimeChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    setOverlapTime(newValue as number);
    if (overlapVideoRef.current) {
      overlapVideoRef.current.currentTime = newValue as number;
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 1,
          boxShadow: 3,
          padding: 4,
          marginTop: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mr: isMobile ? 0 : 3,
              mb: isMobile ? 2 : 0,
            }}
          >
            <Image
              src={user?.imageUrl || userProfile.photo}
              alt={
                user?.fullName ||
                `${user?.firstName} ${user?.lastName}` ||
                userProfile.name
              }
              width={120}
              height={120}
              style={{ borderRadius: "50%" }}
            />
          </Avatar>
          <Box
            sx={{
              textAlign: "left",
              textAlignLast: isMobile ? "center" : "left",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{ color: "black", mr: isMobile ? 0 : 2 }}
              gutterBottom
            >
              {user?.fullName ||
                `${user?.firstName} ${user?.lastName}` ||
                userProfile.name}
            </Typography>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              component="div"
              sx={{ color: "gray" }}
              gutterBottom
            >
              {userProfile.handle}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "black", mt: isMobile ? 1 : 0 }}
              paragraph
            >
              {userProfile.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 1,
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <Typography variant="body2" sx={{ color: "black" }}>
                <strong>{userProfile.followers}</strong> Followers
              </Typography>
              <Typography variant="body2" sx={{ color: "black" }}>
                <strong>{userProfile.following}</strong> Following
              </Typography>
              <Typography variant="body2" sx={{ color: "black" }}>
                <strong>{userProfile.videos.length}</strong> Videos
              </Typography>
            </Box>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Box>
        </Box>

        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 4 }}>
            <TabList
              onChange={handleTabChange}
              aria-label="profile tabs"
              variant={isMobile ? "scrollable" : "standard"}
            >
              <Tab label="Videos" value="videos" />
              <Tab label="Tags" value="tags" />
              <Tab label="Groups" value="groups" />
            </TabList>
          </Box>
          <TabPanel value="videos">
            <Grid container spacing={2}>
              {userProfile.videos.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      overflow: "hidden",
                      boxShadow: 1,
                      width: "100%",
                      height: "300px", // Fixed height for videos
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "black",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleOpenDialog({
                        url: video.url,
                        description: video.description,
                        template: video.template,
                      })
                    }
                  >
                    <video width="100%" height="100%">
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="tags">
            <Grid container spacing={2}>
              {userProfile.tags.map((tag, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      overflow: "hidden",
                      boxShadow: 1,
                      width: "100%",
                      height: "300px", // Fixed height for tags
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "black",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleOpenDialog({
                        url: tag.url,
                        description: tag.description,
                      })
                    }
                  >
                    <video width="100%" height="100%">
                      <source src={tag.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="groups">
            <Grid container spacing={2}>
              {userProfile.joinedClasses.map((joinedClass) => (
                <Grid item xs={12} sm={6} md={4} key={joinedClass.id}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      overflow: "hidden",
                      boxShadow: 1,
                      width: "100%",
                      height: "300px", // Fixed height for class images
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleOpenDialog({
                        url: joinedClass.imageUrl,
                        description: joinedClass.title,
                      })
                    }
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={joinedClass.imageUrl}
                        alt={joinedClass.title}
                        width={300}
                        height={200}
                        layout="responsive"
                        style={{ borderRadius: "0", objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "black" }}>
                        {joinedClass.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "black" }}>
                        Date: {joinedClass.date}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </TabContext>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth={"md"}
        fullWidth
        fullScreen={isMobile}
      >
        <DialogContent>
          <Button
            variant="text"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", left: 4, top: 4, color: "black" }}
          >
            <BackIcon />
          </Button>
          {dialogContent && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 0,
                  paddingBottom: "56.25%", // Maintain 16:9 aspect ratio
                  "&:hover .overlay-icon, &:hover .right-bottom-icons, &:hover .extra-icons":
                    {
                      opacity: 1,
                    },
                }}
              >
                <video
                  ref={videoRef}
                  src={dialogContent.url}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  autoPlay
                  loop
                  muted
                />
                {videoOverlap && overlapUrl && (
                  <animated.div
                    style={{
                      ...style,
                      opacity: opacity / 100,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <video
                      ref={overlapVideoRef}
                      src={overlapUrl}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      autoPlay
                      loop
                      muted
                    />
                  </animated.div>
                )}
                {dialogContent.template && (
                  <Box
                    className="right-bottom-icons"
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      opacity: 0,
                      transition: "opacity 0.3s",
                      justifyContent: "flex-start",
                      width: "auto",
                    }}
                  >
                    {videoOverlap && !isMobile && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        <IconButton onClick={() => setShowOpacitySlider(true)}>
                          <OpacityIcon />
                        </IconButton>
                        {showOpacitySlider && (
                          <Slider
                            aria-label="Opacity"
                            value={opacity}
                            onChange={handleOpacityChange}
                            sx={{ width: 200, color: "#fff" }}
                            onChangeCommitted={() =>
                              setShowOpacitySlider(false)
                            }
                          />
                        )}
                        <IconButton onClick={handleMirror}>
                          <FlipIcon />
                        </IconButton>
                        <IconButton onClick={() => setShowTimeSlider(true)}>
                          <TimerIcon />
                        </IconButton>
                        {showTimeSlider && (
                          <Slider
                            aria-label="Time"
                            value={overlapTime}
                            onChange={handleOverlapTimeChange}
                            sx={{ width: 200, color: "#fff" }}
                            max={overlapVideoRef.current?.duration || 100}
                            onChangeCommitted={() => setShowTimeSlider(false)}
                          />
                        )}
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "transparent",
                        padding: 0,
                        width: 48,
                        margin: 0,
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                      onClick={() =>
                        handleVideoOverlap(dialogContent.template || "")
                      }
                    >
                      <SwitchVideoIcon />
                    </Button>
                  </Box>
                )}
                <IconButton
                  className="overlay-icon"
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
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              </Box>
              <Box sx={{ mt: 2 }}>
                {videoOverlap && isMobile && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <IconButton onClick={() => setShowOpacitySlider(true)}>
                        <OpacityIcon />
                      </IconButton>
                      <IconButton onClick={handleMirror}>
                        <FlipIcon />
                      </IconButton>
                      <IconButton onClick={() => setShowTimeSlider(true)}>
                        <TimerIcon />
                      </IconButton>
                    </Box>
                    {showOpacitySlider && (
                      <Slider
                        aria-label="Opacity"
                        value={opacity}
                        onChange={handleOpacityChange}
                        sx={{ width: 200, color: "#fff" }}
                        onChangeCommitted={() => setShowOpacitySlider(false)}
                      />
                    )}
                    {showTimeSlider && (
                      <Slider
                        aria-label="Time"
                        value={overlapTime}
                        onChange={handleOverlapTimeChange}
                        sx={{ width: 200, color: "#fff" }}
                        max={overlapVideoRef.current?.duration || 100}
                        onChangeCommitted={() => setShowTimeSlider(false)}
                      />
                    )}
                  </>
                )}
                <Typography variant="h6">Comments</Typography>
                <List>
                  {comments.map((comment, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <Image
                            src={user?.imageUrl || userProfile.photo}
                            alt={userProfile.name}
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%" }}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={comment} />
                    </ListItem>
                  ))}
                </List>
                <TextField
                  id="comment"
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                  sx={{ mt: 1 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Profile;
