import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const placeCodes = [
  "TPE",
  "TXG",
  "KHH",
  "TNN",
  "HSZ",
  "TYN",
  "KEE",
  "CYI",
  "PIF",
  "ILA",
  "HUN",
  "TTT",
  "MIA",
  "NAN",
  "CHA",
  "YUN",
  "PEN",
  "KIN",
  "LIE",
];

const updateUserRequestSchema = z.object({
  availablePlace: z.array(z.enum([placeCodes[0], ...placeCodes.slice(1)])),
});

// POST /api/user/where
/// Create User
export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  console.log(user.id);
  try {
    //find userSessionId in the database if not found create a new user yes update the lastLoginAt
    const dbUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.userSessionId, user.id),
    });
    const body = await req.json();
    const parsedBody = updateUserRequestSchema.parse({ availablePlace: body });

    const availablePlaceJSON = JSON.stringify(parsedBody.availablePlace);

    if (dbUser) {
      await db
        .update(usersTable)
        .set({
          availablePlace: availablePlaceJSON,
        })
        .where(eq(usersTable.userSessionId, user.id))
        .execute();
    } else {
      await db
        .insert(usersTable)
        .values({
          userSessionId: user.id,
          username: user.username || "Anonymous",
          availablePlace: availablePlaceJSON,
        })
        .execute();
    }

    return NextResponse.json({ id: user.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Get /api/user/where
/// Get User
export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  console.log(user.id);
  try {
    //find userSessionId in the database if not found create a new user yes update the lastLoginAt
    const dbUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.userSessionId, user.id),
    });
    if (dbUser) {
      return NextResponse.json(dbUser.availablePlace, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
