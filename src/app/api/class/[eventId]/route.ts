import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const defaultItemData = [
  {
    img: "/Magnet2.png",
    title: "Kpop Dance Workshop",
    description: "Find the professional team, kroove together!",
    group: "ILLIT",
    song: "「Magnet」",
    author: "@kristastucchio",
    userSessionId: "123",
    isOngoing: true,
    stage: "Intermediate",
    people: [
      { name: "WONHEE", state: false },
      { name: "YUNAH", state: true },
      { name: "MINJU", state: false },
      { name: "MOKA", state: true },
      { name: "IROHA", state: true },
    ],
    eventId: "event1",
  },
  {
    img: "/kpop1.png",
    title: "「How Sweet」",
    description: "Find the professional team, kroove together!",
    group: "NewJeans",
    song: "「How Sweet」",
    author: "@rollelflex",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
    people: [
      { name: "Hyein", state: true },
      { name: "Hanni", state: true },
      { name: "Danielle", state: false },
      { name: "Haerin", state: false },
      { name: "Minji", state: false },
    ],
    eventId: "event2",
  },
  {
    img: "/GI-DLE_Queencard.png",
    title: "「Queencard」",
    description: "Find the professional team, kroove together!",
    group: "(G)I-DLE",
    song: "「Queencard」",
    author: "@helloimnik",
    userSessionId: "123",
    isOngoing: false,
    stage: "Beginner",
    people: [
      { name: "薇娟", state: false },
      { name: "Minnie", state: true },
      { name: "小娟", state: false },
      { name: "雨琦", state: true },
      { name: "舒華", state: true },
    ],
    eventId: "event3",
  },
  {
    img: "/MidasTouch.png",
    title: "「MIDAS Touch」",
    description:
      "Take your Kpop dancing skills to the next level with this intensive training.",
    group: "KISS OF LIFE",
    song: "「MIDAS Touch」",
    author: "@nolanissac",
    userSessionId: "123",
    isOngoing: true,
    stage: "Advanced",
    people: [
      { name: "Natty", state: true },
      { name: "Julie", state: false },
      { name: "Haneul", state: true },
      { name: "Belle", state: false },
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
