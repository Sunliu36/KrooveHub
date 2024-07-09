import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const defaultItemData = [
  {
    img: "\Magnet2.png",
    title: "「Magnet」",
    url: "/Magnet.mp4",
    group: "ILLIT",
    song: "「Magnet」",
    description: "At KrooveHub, groove in kpop !",
    author: "金針老師",
    userSessionId: "123",
    isOngoing: true,
    stage: "Intermediate",
    people: 5,
    eventId: "event1",
  },
  {
    img: "/kpop1.png",
    title: "「How Sweet」",
    url: "/HowSweet.mp4",
    group: "NewJeans",
    song: "「How Sweet」",
    description: "At KrooveHub, groove in kpop !",
    author: "Sun老師",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
    people: 5,
    eventId: "event2",
  },
  {
    img: "/GI-DLE_Queencard.png",
    title: "「Queencard」",
    url: "/Queencard.mp4",
    group: "(G)I-DLE",
    song: "「Queencard」",
    description: "At KrooveHub, groove in kpop !",
    author: "Calvin老師",
    userSessionId: "123",
    isOngoing: false,
    stage: "Beginner",
    people: 5,
    eventId: "event3",
  },
  {
    img: "/MidasTouch.png",
    title: "「MIDAS Touch」",
    url: "/MidasTouch.mp4",
    group: "KISS OF LIFE",
    song: "「MIDAS Touch」",
    description: "At KrooveHub, groove in kpop !",
    author: "Vira老師",
    userSessionId: "123",
    isOngoing: true,
    stage: "Beginner",
    people: 4,
    eventId: "event4",
  },
  {
    img: "/Supernova.png",
    title: "「Supernova」",
    url: "/Supernova.mp4",
    group: "aespa",
    song: "「Supernova」",
    description: "At KrooveHub, groove in kpop !",
    author: "CC老師",
    userSessionId: "123",
    isOngoing: true,
    stage: "Intermediate",
    people: 4,
    eventId: "event1",
  },
  {
    img: "/Smoke.png",
    title: "「SMOKE」",
    url: "/Smoke.mp4",
    group: "Bada Lee",
    song: "「SMOKE」",
    description: "At KrooveHub, groove in kpop !",
    author: "偉呈老師",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
    people: 7,
    eventId: "event4",
  },
  {
    img: "/aespa.png",
    title: "「Drama」",
    url: "/sample-video2.mp4",
    group: "aespa",
    song: "「Drama」",
    description: "At KrooveHub, groove in kpop !",
    author: "Tracy老師",
    userSessionId: "123",
    isOngoing: false,
    stage: "Beginner",
    people: 6,
    eventId: "event3",
  },
  {
    img: "/TT.png",
    title: "「TT」",
    url: "/TT.mp4",
    group: "Twice",
    song: "「TT」",
    description: "At KrooveHub, groove in kpop !",
    author: "鈞元老師",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
    people: 4,
    eventId: "event2",
  },
];

// Get /api/class
/// Get User
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(defaultItemData, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
