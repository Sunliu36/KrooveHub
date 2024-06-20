import React from "react";

import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";

interface Video {
  title: string;
  url: string;
}

interface VideoListProps {
  videos: Video[];
  onSelect: (url: string | null) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onSelect }) => {
  return (
    <Box>
      <Grid container>
        {videos.map((video, index) => (
          <Grid
            item
            key={index}
            xs={4}
            sm={4}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                width: "100%",
                paddingBottom: "100%", // For square aspect ratio
                position: "relative",
              }}
            >
              <CardActionArea
                onClick={() => onSelect(video.url)}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <video
                  src={video.url}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  controls={false}
                  muted
                  loop
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    padding: "0.3rem",
                  }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {video.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoList;
