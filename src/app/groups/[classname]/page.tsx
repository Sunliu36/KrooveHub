"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import RenderPeople from "@/components/renderPeople";

import WhenToMeet from "./whentomeet";

interface Person {
  name: string;
  state: boolean;
}

interface Event {
  img: string;
  title: string;
  group: string;
  song: string;
  description: string;
  people: Person[];
}

function EventsIdPage() {
  const params = useParams();
  const name = params.classname?.toString();
  const [dbEvent, setDbEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (name) {
      fetch(`/api/class/${name}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) setDbEvent(data);
        })
        .catch((error) => console.error("Failed to load class data", error));
    }
  }, [name]);

  if (!dbEvent) {
    return <div>Loading...</div>; // Show a loading state until the data is fetched
  }

  return (
    <div className="flex min-h-screen flex-col items-center mt-24">
      <div className="flex flex-col items-center justify-center w-full gap-3">
        <Box
          sx={{
            position: "absolute",
            top: 80,
            left: 10,
            backgroundColor: "transparent",
            zIndex: 3,
          }}
        >
          <Link href="/groups">
            <IconButton sx={{ color: "white" }}>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Box>
        <div className="group rounded-3xl overflow-hidden relative">
          <div style={{ width: 300, height: 160, position: "relative" }}>
            <Image
              width={300}
              height={160}
              src={dbEvent.img}
              alt={dbEvent.title}
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
                {dbEvent.group} - {dbEvent.song}
              </Typography>
            </Box>
          </div>
        </div>
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-purple1"></span>
            <span>Not Open</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-gray1"></span>
            <span>Available</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RenderPeople people={dbEvent.people} />
        </div>
        <WhenToMeet classname={dbEvent.title} />
      </div>
    </div>
  );
}

export default EventsIdPage;
