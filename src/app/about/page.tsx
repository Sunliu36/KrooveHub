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

const FindYourKroove = [
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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <Container maxWidth="md" sx={{ flex: "1 0 auto" }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{
            fontWeight: "bold",
            fontSize: "3rem",
            padding: "1rem",
            color: "white",
          }}
        >
          <h1 className="font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            About KrooveHub
          </h1>
        </Typography>

        <Image
          src="/favicon.png"
          className="rounded-circle justify-center mx-auto mb-4"
          width={200}
          height={200}
          alt="About KrooveHub"
        />
        <Typography variant="body1" paragraph align="center">
          Welcome to KrooveHub, the ultimate platform tailored exclusively for
          dancers! Whether you&apos;re an aspiring performer, a seasoned pro, or
          someone who simply loves to kroove, KrooveHub is designed to be your
          digital stage.
        </Typography>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Share Your Moves
          </Typography>
          <Typography variant="body1" paragraph>
            Show off your dance talent and creativity by sharing your videos on
            KrooveHub. Like on Instagram or TikTok, our platform makes it easy
            to upload and showcase your dance videos, but here&apos;s the twist:
            it&apos;s only for dancers. Share your unique choreography,
            participate in challenges, and let your moves inspire others in the
            global dance community.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Find Your Kroove
          </Typography>
          <List>
            {FindYourKroove.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "#333333",
                  borderRadius: 2,
                  my: 2,
                  boxShadow: 1,
                }}
              >
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#FFD700" }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                  primaryTypographyProps={{
                    sx: { color: "white" },
                  }}
                  secondaryTypographyProps={{
                    sx: { color: "white" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Why KrooveHub?
          </Typography>
          <List>
            {aboutInfos.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "#333333",
                  borderRadius: 2,
                  my: 2,
                  boxShadow: 1,
                }}
              >
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#FFD700" }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                  primaryTypographyProps={{
                    sx: { color: "white" },
                  }}
                  secondaryTypographyProps={{
                    sx: { color: "white" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box my={4} mb={10}>
          <Typography variant="h4" component="h2" gutterBottom>
            Join the Movement
          </Typography>
          <Typography variant="body1" paragraph>
            KrooveHub is more than just a platform; it&apos;s a movement.
            Whether you&apos;re here to learn, teach, or inspire, our community
            embraces the love of dance in all its forms. So come kroove with
            us—download KrooveHub today and start your journey!
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
