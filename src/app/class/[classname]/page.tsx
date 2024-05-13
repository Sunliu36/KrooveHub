"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import WhenToMeet from "./whentomeet";

function EventsIdPage() {
  const params = useParams();
  console.log(params);
  const name = params.classname?.toString();
  const dbEvent = {
    id: 1,
    displayId: "21",
    description: "description",
  };

  return (
    <div className="flex min-h-screen flex-col items-center text-dimWhite">
      <div className="flex flex-col items-center justify-center w-full gap-3">
        <h1 className="text-4xl font-bold text-center">{name}</h1>
        <Image
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="GrooveHub Logo"
          width={200}
          height={200}
        />
        <p className="text-center">{dbEvent.description}</p>
        <WhenToMeet classname={name} />
      </div>
    </div>
  );
}

export default EventsIdPage;
