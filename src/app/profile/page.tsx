"use client";

import React from "react";

import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";

interface JoinedClass {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

interface UserProfile {
  name: string;
  photo: string;
  joinedClasses: JoinedClass[];
}

// Mock data for user profile and joined classes
const userProfile: UserProfile = {
  name: "UnKnown Dancer",
  photo: "/profile-photo.jpg", // Make sure to place a photo at this path or update with the correct path
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
};

const Profile: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  console.log(user);
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 1,
          boxShadow: 3,
          padding: 4,
          marginTop: 4,
          textAlign: "center",
        }}
      >
        <Avatar sx={{ width: 120, height: 120, margin: "0 auto 1rem" }}>
          <Image
            src={user.imageUrl || userProfile.photo}
            alt={
              user.fullName ||
              user.firstName + " " + user.lastName ||
              userProfile.name
            }
            width={120}
            height={120}
            style={{ borderRadius: "50%" }}
          />
        </Avatar>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: "black" }}
          gutterBottom
        >
          {user.fullName ||
            user.firstName + " " + user.lastName ||
            userProfile.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "black" }} paragraph>
          Welcome to your profile page! Here you can see the classes you have
          joined.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Edit Profile
        </Button>
        <Typography variant="h5" component="h2" gutterBottom>
          Joined Classes
        </Typography>
        <List>
          {userProfile.joinedClasses.map((joinedClass) => (
            <ListItem
              key={joinedClass.id}
              sx={{
                padding: "16px",
                borderBottom: "1px solid #ddd",
                gap: "16px",
              }}
            >
              <ListItemAvatar>
                <Image
                  src={joinedClass.imageUrl}
                  alt={joinedClass.title}
                  width={100}
                  height={50}
                  style={{ borderRadius: "20%" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={joinedClass.title}
                secondary={`Date: ${joinedClass.date}`}
                sx={{ color: "black" }}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default Profile;
