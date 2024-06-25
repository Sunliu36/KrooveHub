"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { ImageList, ImageListItem, Box, Typography } from "@mui/material";

interface SongProps {
  data: {
    title: string;
    author: string;
    url: string;
    group: string;
    song: string;
    img: string;
    stage: string;
    people: number;
    isOngoing: boolean;
    eventId: string;
  }[];
}

const Song: React.FC<SongProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 rounded-md overflow-hidden relative">
        <div className="w-full flex items-start">
          <Typography variant="h6" className="mb-2">
            可能會喜歡的歌...
          </Typography>
        </div>
        <ImageList variant="masonry" cols={1} gap={40}>
          {data.map((item) => {
            const videoName = item.url.replace(".mp4", "");
            const url = `/videos/${videoName}`;
            return (
              <Link key={item.title} href={url}>
                <ImageListItem>
                  <div className="group rounded-4xl overflow-hidden relative">
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
                </ImageListItem>
              </Link>
            );
          })}
        </ImageList>
      </div>
    </div>
  );
};

export default Song;
