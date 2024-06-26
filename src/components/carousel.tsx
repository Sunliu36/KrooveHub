"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
  ImageListItem,
  ImageListItemBar,
  Chip,
  Box,
  Typography,
} from "@mui/material";

interface CarouselProps {
  data: {
    title: string;
    author: string;
    group: string;
    song: string;
    img: string;
    stage: string;
    people: number;
    isOngoing: boolean;
    eventId: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elem = carouselRef.current as HTMLDivElement;
    const { width, height } = elem.getBoundingClientRect();
    setCarouselSize({ width, height });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 h-60 rounded-md overflow-hidden relative">
        <div
          ref={carouselRef}
          style={{
            left: -currentImg * carouselSize.width,
          }}
          className="w-full h-full absolute flex transition-all duration-300"
        >
          {data.map((item) => (
            <div key={item.title} className="relative shrink-0 w-full h-full">
              <ImageListItem>
                <div className="group rounded-3xl overflow-hidden relative">
                  <div
                    style={{ width: 320, height: 180, position: "relative" }}
                  >
                    <Image
                      width={320}
                      height={180}
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="rounded-3xl p-0 w-full h-full object-cover"
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
                        {item.title} x {item.author}
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
                        size="small"
                        className="mr-2 mt-2 text-bold"
                      />
                      <Chip
                        label={`${item.people} min`}
                        color="primary"
                        size="small"
                        className="mr-2 mt-2"
                      />
                    </>
                  }
                />
              </ImageListItem>
            </div>
          ))}
        </div>
        <button
          disabled={currentImg === 0}
          onClick={() => setCurrentImg((prev) => prev - 1)}
          className={`absolute left-0 top-1/4 px-4 py-2 font-bold text-transparent ${currentImg === 0 && "opacity-50"} hover:text-white`}
        >
          {"<"}
        </button>
        <button
          disabled={currentImg === data.length - 1}
          onClick={() => setCurrentImg((prev) => prev + 1)}
          className={`absolute right-0 top-1/4 px-4 py-2 font-bold text-transparent ${currentImg === data.length - 1 && "opacity-50"} hover:text-white`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
