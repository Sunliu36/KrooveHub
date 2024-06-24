import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const defaultItemData = [
  {
    img: "/kpop1.png",
    title: "Kpoppp",
    description: "Kpop Dance is good good for everyone to join",
    author: "@bkristastucchio",
    userSessionId: "123",
    isOngoing: true,
    stage: "intermediate",
    people: 10,
    eventId: "event1",
  },
  {
    img: "/kpop2.png",
    title: "Dance Club",
    description: "Kpop Dance is good good for everyone to join",
    author: "@rollelflex",
    userSessionId: "123",
    isOngoing: true,
    stage: "hard",
    people: 4,
    eventId: "event2",
  },
  {
    img: "/kpop3.png",
    title: "Cool Dance",
    description: "Kpop Dance is good good for everyone to join",
    author: "@helloimnik",
    userSessionId: "123",
    isOngoing: false,
    stage: "easy",
    people: 6,
    eventId: "event3",
  },
  {
    img: "/kpop3.png",
    title: "Kpop Dance",
    description: "Kpop Dance is good good for everyone to join",
    author: "@nolanissac",
    userSessionId: "123",
    isOngoing: true,
    stage: "Very Hard",
    people: 7,
    eventId: "event4",
  },
  {
    img: "/kpop1.png",
    title: "Kpoppp",
    description: "Kpop Dance is good good for everyone to join",
    author: "@bkristastucchio",
    userSessionId: "123",
    isOngoing: true,
    stage: "intermediate",
    people: 10,
    eventId: "event1",
  },
  {
    img: "/kpop2.png",
    title: "Dance Club",
    description: "Kpop Dance is good good for everyone to join",
    author: "@rollelflex",
    userSessionId: "123",
    isOngoing: true,
    stage: "hard",
    people: 4,
    eventId: "event2",
  },
  {
    img: "/kpop3.png",
    title: "Cool Dance",
    description: "Kpop Dance is good good for everyone to join",
    author: "@helloimnik",
    userSessionId: "123",
    isOngoing: false,
    stage: "easy",
    people: 6,
    eventId: "event3",
  },
  {
    img: "/kpop3.png",
    title: "Kpop Dance",
    description: "Kpop Dance is good good for everyone to join",
    author: "@nolanissac",
    userSessionId: "123",
    isOngoing: true,
    stage: "Very Hard",
    people: 7,
    eventId: "event4",
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
