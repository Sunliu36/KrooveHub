import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const defaultItemData = [
  {
    img: "/kpop1.png",
    title: "Kpopopop",
    url: "/sample-video5.mp4",
    group: "Blackpink",
    song: "SHUT DOWN",
    description: "Kpop Dance is good good for everyone to join",
    author: "金針",
    userSessionId: "123",
    isOngoing: true,
    stage: "Intermediate",
    people: 5,
    eventId: "event1",
  },
  {
    img: "/kpop2.png",
    title: "五八",
    url: "/sample-video2.mp4",
    group: "Blackpink",
    song: "WHISTLE",
    description: "Kpop Dance is good good for everyone to join",
    author: "大金針菇",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
    people: 4,
    eventId: "event2",
  },
  {
    img: "/kpop3.png",
    title: "Cool Dance",
    url: "/sample-video3.mp4",
    group: "Blackpink",
    song: "WHISTLE",
    description: "Kpop Dance is good good for everyone to join",
    author: "金針菇",
    userSessionId: "123",
    isOngoing: false,
    stage: "Beginner",
    people: 6,
    eventId: "event3",
  },
  {
    img: "/kpop4.png",
    title: "Kpoo",
    url: "/sample-video4.mp4",
    group: "Blackpink",
    song: "WHISTLE",
    description: "Kpop Dance is good good for everyone to join",
    author: "金針菇",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
    people: 7,
    eventId: "event4",
  },
  {
    img: "/kpop5.png",
    title: "Kpoppp",
    url: "/sample-video5.mp4",
    group: "Twice",
    song: "WHISTLE",
    description: "Kpop Dance is good good for everyone to join",
    author: "金針菇",
    userSessionId: "123",
    isOngoing: true,
    stage: "Intermediate",
    people: 10,
    eventId: "event1",
  },
  {
    img: "/kpop1.png",
    title: "Danclub",
    url: "/sample-video3.mp4",
    group: "Blackpink",
    song: "WHISTLE",
    description: "Kpop Dance is good good for everyone to join",
    author: "金針菇",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
    people: 4,
    eventId: "event2",
  },
  {
    img: "/kpop2.png",
    title: "CoDance",
    url: "/sample-video2.mp4",
    group: "Blackpink",
    song: "WHISTLE",
    description: "Kpop Dance is good good for everyone to join",
    author: "金針菇",
    userSessionId: "123",
    isOngoing: false,
    stage: "Beginner",
    people: 6,
    eventId: "event3",
  },
  {
    img: "/kpop3.png",
    title: "Kice",
    url: "/sample-video5.mp4",
    group: "Blackpink",
    song: "WHISTLE",
    description: "Kpop Dance is good good for everyone to join",
    author: "金針菇",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
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
