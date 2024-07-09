"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import PersonIcon from "@mui/icons-material/Person";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Tab,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Chip,
  Link,
} from "@mui/material";

import VideoSquare from "@/components/videoSquare";

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
  photo: "/EpochSchool.jpg", // Make sure to place a photo at this path or update with the correct path
  videos: [
    {
      url: "/sample-video3.mp4",
      description: "Sample Video 1",
      template: "/sample-video2.mp4",
    },
    { url: "/sample-video2.mp4", description: "Sample Video 2" },
    { url: "/sample-video4.mp4", description: "Sample Video 3" },
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
    { url: "/sample-video5.mp4", description: "Tag Video 3" },
  ],
};

interface ClassType {
  title: string;
  author: string;
  group: string;
  song: string;
  img: string;
  stage: string;
  people: number;
  isOngoing: boolean;
  eventId: string;
}

const Profile: React.FC = () => {
  const { user } = useUser();
  const [view, setView] = useState("videos");
  const [itemData, setItemData] = useState<ClassType[]>([]);

  useEffect(() => {
    // Fetch data from API
    // setItemData(data);
    fetch("/api/class")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) setItemData(data);
      })
      .catch((error) => {
        console.error("Failed to load class data", error);
      });
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          background: "black",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          marginTop: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50, // Adjust this value as needed
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 0,
            width: "100%",
            height: 200, // Adjust this value as needed
            overflow: "hidden",
            borderRadius: 1,
          }}
        >
          <Image
            src="/EpochSchool.png" // Path to your background image
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mt: 6,
                  border: "2px solid white", // Border around the avatar for better visibility
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
              <Typography
                variant={"h6"}
                component="h1"
                sx={{ mt: 2 }}
                gutterBottom
              >
                {user?.fullName ||
                  `${user?.firstName} ${user?.lastName}` ||
                  userProfile.name}
              </Typography>
              <Typography variant="subtitle2" component="div" gutterBottom>
                {userProfile.handle}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant={"outlined"}
                  sx={{ color: "white", padding: 0, borderColor: "white" }}
                  onClick={() => setView("videos")}
                >
                  課程
                </Button>
                <Button
                  variant={"outlined"}
                  sx={{ color: "white", padding: 0, borderColor: "white" }}
                  onClick={() => setView("groups")}
                >
                  團體
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ textAlign: "left", textAlignLast: "left" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 24,
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="body2">
                  <strong>{userProfile.followers}</strong> Followers
                </Typography>
                <Typography variant="body2">
                  <strong>{userProfile.following}</strong> Following
                </Typography>
                <Typography variant="body2">
                  <strong>{userProfile.videos.length}</strong> Videos
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }} paragraph>
                {userProfile.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {view === "videos" && (
          <Grid container sx={{ mt: 4 }}>
            <VideoSquare />
          </Grid>
        )}

        {view === "groups" && (
          <ImageList variant="masonry" cols={1} gap={10} sx={{ mt: 2 }}>
            {itemData.map((item) => (
              <Link key={item.title} href={`/groups/${item.eventId}`}>
                <ImageListItem>
                  <div className="group rounded-3xl overflow-hidden relative">
                    <div
                      style={{ width: 300, height: 160, position: "relative" }}
                    >
                      <Image
                        width={300}
                        height={160}
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="rounded-3xl p-0"
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          padding: "8px",
                        }}
                      >
                        <Typography variant="subtitle1">
                          {item.group} - {item.song}
                        </Typography>
                      </Box>
                    </div>
                  </div>
                  <ImageListItemBar
                    title={`${item.title} x ${item.author}`}
                    position="below"
                    sx={{
                      marginLeft: 2,
                      color: "gray",
                    }}
                    actionIcon={
                      <>
                        <Chip
                          label={item.stage}
                          sx={
                            item.stage === "Beginner"
                              ? {
                                  backgroundColor: "#5AA2D6",
                                  color: "white",
                                }
                              : item.stage === "Intermediate"
                                ? {
                                    backgroundColor: "#CB5AD6",
                                    color: "white",
                                  }
                                : {
                                    backgroundColor: "#CB8736",
                                    color: "white",
                                  }
                          }
                          size="small" // Optional: Adjust size based on your preferences
                          className="mr-2 mt-2"
                        />
                        <Chip
                          icon={<PersonIcon />} // Add the icon here
                          label={`${item.people}`}
                          sx={{ backgroundColor: "gray", color: "white" }}
                          size="small"
                          className="mr-2 mt-2"
                        />
                      </>
                    }
                  />
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
