import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const defaultItemData = [
  {
    img: "/kpop1.png",
    title: "Kpop Dance Workshop",
    description:
      "Join us for an exciting Kpop dance workshop suitable for everyone.",
    author: "@kristastucchio",
    userSessionId: "123",
    isOngoing: true,
    stage: "Intermediate",
    people: [
      { name: "Alice", state: false },
      { name: "John", state: true },
      { name: "Mary", state: false },
      { name: "Steve", state: true },
      { name: "Lisa", state: true },
      { name: "Tom", state: false },
      { name: "Jerry", state: false },
    ],
    eventId: "event1",
  },
  {
    img: "/kpop2.png",
    title: "Advanced Dance Club",
    description:
      "Challenge yourself with advanced Kpop dance routines in this club.",
    author: "@rollelflex",
    userSessionId: "123",
    isOngoing: true,
    stage: "Hard",
    people: [
      { name: "Bob", state: true },
      { name: "Lisa", state: true },
      { name: "Tom", state: false },
      { name: "Jerry", state: false },
      { name: "Emma", state: true },
      { name: "Oliver", state: false },
    ],
    eventId: "event2",
  },
  {
    img: "/kpop3.png",
    title: "Beginner's Dance Class",
    description: "Learn the basics of Kpop dance in this class for beginners.",
    author: "@helloimnik",
    userSessionId: "123",
    isOngoing: false,
    stage: "Easy",
    people: [
      { name: "Charlie", state: false },
      { name: "Emma", state: true },
      { name: "Oliver", state: false },
      { name: "Sophia", state: true },
      { name: "Lisa", state: true },
      { name: "Tom", state: false },
      { name: "Jerry", state: false },
    ],
    eventId: "event3",
  },
  {
    img: "/kpop4.png",
    title: "Intensive Kpop Training",
    description:
      "Take your Kpop dancing skills to the next level with this intensive training.",
    author: "@nolanissac",
    userSessionId: "123",
    isOngoing: true,
    stage: "Very Hard",
    people: [
      { name: "Daisy", state: true },
      { name: "Michael", state: false },
      { name: "William", state: true },
      { name: "James", state: false },
      { name: "Emma", state: true },
    ],
    eventId: "event4",
  },
];

// Get /api/class/[eventId]
/// Get User
export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      eventId: string;
    };
  },
) {
  const { eventId } = params;
  try {
    const itemData = defaultItemData.find((item) => item.eventId === eventId);
    if (!itemData) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(itemData, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
