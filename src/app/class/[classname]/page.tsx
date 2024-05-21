"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import WhenToMeet from "./whentomeet";

interface Event {
  img: string;
  title: string;
  description: string;
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
    <div className="flex min-h-screen flex-col items-center text-dimWhite">
      <div className="flex flex-col items-center justify-center w-full gap-3">
        <h1 className="text-4xl font-bold text-center">{dbEvent.title}</h1>
        <Image src={dbEvent.img} alt={dbEvent.title} width={300} height={300} />
        <p className="text-center">{dbEvent.description}</p>
        <WhenToMeet classname={dbEvent.title} />
      </div>
    </div>
  );
}

export default EventsIdPage;
