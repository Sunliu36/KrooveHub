"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import PersonIcon from "@mui/icons-material/Person";

import WhenToMeet from "./whentomeet";

interface Person {
  name: string;
  state: boolean;
}

interface Event {
  img: string;
  title: string;
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

  const renderPeople = () => {
    const peopleChunks = [];
    for (let i = 0; i < dbEvent.people.length; i += 6) {
      peopleChunks.push(dbEvent.people.slice(i, i + 6));
    }

    return peopleChunks.map((chunk, chunkIndex) => (
      <div key={chunkIndex} className="grid grid-cols-3 gap-4 w-full">
        {chunk.map((person, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <PersonIcon
              style={{ color: person.state ? "green" : "red", fontSize: 40 }}
            />
            <span>{person.name}</span>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="flex min-h-screen flex-col items-center mt-20">
      <div className="flex flex-col items-center justify-center w-full gap-3">
        <h1 className="text-4xl font-bold text-center">{dbEvent.title}</h1>
        <Image src={dbEvent.img} alt={dbEvent.title} width={300} height={300} />
        <p className="text-center">{dbEvent.description}</p>
        <div className="flex items-center gap-2">
          <span
            className={"inline-block w-4 h-4 rounded-full bg-red-500"}
          ></span>
          <span>Not Open</span>
          <span
            className={"inline-block w-4 h-4 rounded-full bg-green-500"}
          ></span>
          <span>Available</span>
        </div>
        <div className="flex flex-col items-center gap-2">{renderPeople()}</div>
        <WhenToMeet classname={dbEvent.title} />
      </div>
    </div>
  );
}

export default EventsIdPage;
