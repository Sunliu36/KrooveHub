import React from "react";

import { useRouter } from "next/navigation";

import { Box, Grid, Card, CardActionArea } from "@mui/material";

interface Video {
  title: string;
  url: string;
}

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const router = useRouter();

  const handleCardClick = (videoUrl: string) => {
    const videoURL = videoUrl.replace(".mp4", "");
    router.push(`/videos/${videoURL}`);
  };
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
                paddingBottom: "150%", // For square aspect ratio
                position: "relative",
              }}
            >
              <CardActionArea
                onClick={() => handleCardClick(video.url)}
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
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoList;
