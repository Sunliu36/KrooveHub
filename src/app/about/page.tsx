// File: pages/about.js
import React from "react";

import Image from "next/image";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const aboutInfos = [
  {
    title: "Exclusively for Dancers",
    description:
      "A dedicated space where dancers can feel at home and free to express themselves without distractions.",
  },
  {
    title: "Global Community",
    description:
      "Join a global network of dancers from all styles, levels, and backgrounds. Learn from others and share your expertise.",
  },
  {
    title: "Easy Navigation",
    description:
      "Our user-friendly interface ensures you can easily find classes, studios, and connections.",
  },
];
const FindYourGroove = [
  {
    title: "Locate Classes",
    description:
      "Discover the best dance studios near you, with reviews, ratings, and schedules to help you find the perfect place to practice.",
  },
  {
    title: "Connect with Teachers",
    description:
      "Find experienced dance teachers and mentors who can guide you on your dance journey.",
  },
  {
    title: "Network with Dancers",
    description:
      "Build connections with other dancers, collaborate on projects, and support each other's growth.",
  },
];
export default function About() {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          color="primary"
          sx={{
            fontWeight: "bold", // Make the text bold
            fontSize: "3rem", // Adjust the font size similarly to 'text-4xl'
            padding: "1rem", // Add padding around the text
          }}
        >
          About GrooveHub
        </Typography>
        <Image
          src="favicon.png"
          className="rounded-circle justify-center mx-auto mb-4"
          width={200}
          height={200}
          alt="About GrooveHub"
        />
        <Typography variant="body1" paragraph align="center">
          Welcome to GrooveHub, the ultimate platform tailored exclusively for
          dancers! Whether you&apos;re an aspiring performer, a seasoned pro, or
          someone who simply loves to groove, GrooveHub is designed to be your
          digital stage.
        </Typography>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Share Your Moves
          </Typography>
          <Typography variant="body1" paragraph>
            Show off your dance talent and creativity by sharing your videos on
            GrooveHub. Like on Instagram or TikTok, our platform makes it easy
            to upload and showcase your dance videos, but here&apos;s the twist:
            it&apos;s only for dancers. Share your unique choreography,
            participate in challenges, and let your moves inspire others in the
            global dance community.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Find Your Groove
          </Typography>
          <List>
            {FindYourGroove.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "#f0f0f0", // Light gray background color for the ListItem
                  borderRadius: 2, // Rounds the corners slightly
                  my: 2, // Adds vertical spacing between ListItems
                  boxShadow: 1, // Adds a subtle shadow
                }}
              >
                <ListItemIcon>
                  <CheckCircleIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                  primaryTypographyProps={{
                    sx: { color: "black" }, // Set the primary text color to black
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Why GrooveHub?
          </Typography>
          <List>
            {aboutInfos.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "#f0f0f0", // Light gray background color for the ListItem
                  borderRadius: 2, // Rounds the corners slightly
                  my: 2, // Adds vertical spacing between ListItems
                  boxShadow: 1, // Adds a subtle shadow
                }}
              >
                <ListItemIcon>
                  <CheckCircleIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                  primaryTypographyProps={{
                    sx: { color: "black" }, // Set the primary text color to black
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Join the Movement
          </Typography>
          <Typography variant="body1" paragraph>
            GrooveHub is more than just a platform; it&apos;s a movement.
            Whether you&apos;re here to learn, teach, or inspire, our community
            embraces the love of dance in all its forms. So come groove with
            us—download GrooveHub today and start your journey!
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
