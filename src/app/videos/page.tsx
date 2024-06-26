"use client";

import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";

import Carousel from "@/components/carousel";
import SongBar from "@/components/songBar";
import TeacherBar from "@/components/teacherBar";

interface ClassType {
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
}

const teacherData = [
  { teacher: "哈妹", image: "/avatar1.png" },
  { teacher: "彩樂", image: "/avatar2.png" },
  { teacher: "花花", image: "/avatar3.png" },
  { teacher: "Aj", image: "/avatar4.png" },
  { teacher: "哈妹", image: "/avatar1.png" },
  { teacher: "彩樂", image: "/avatar2.png" },
  { teacher: "花花", image: "/avatar3.png" },
  { teacher: "Aj", image: "/avatar4.png" },
  { teacher: "哈妹", image: "/avatar1.png" },
  { teacher: "彩樂", image: "/avatar2.png" },
  { teacher: "花花", image: "/avatar3.png" },
  { teacher: "Aj", image: "/avatar4.png" },
];

const ImagesList: React.FC = () => {
  const [itemData, setItemData] = useState<ClassType[]>([]);

  useEffect(() => {
    fetch("/api/class")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setItemData(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load class data", error);
      });
  }, []);

  return (
    <div className="justify-center items-center flex flex-col mt-4 w-full pt-16 mb-12">
      <Box
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Carousel data={itemData} />
        <TeacherBar data={teacherData} />
        <SongBar data={itemData} />
      </Box>
    </div>
  );
};

export default ImagesList;
