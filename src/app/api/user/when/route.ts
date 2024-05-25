import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const updateUserRequestSchema = z.object({
  availableTime: z.array(
    z.object({
      dayIndex: z.number(),
      hourIndex: z.number(),
    }),
  ),
});

// POST /api/user/when
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
    const parsedBody = updateUserRequestSchema.parse({ availableTime: body });

    const availableTimeJSON = JSON.stringify(parsedBody.availableTime);

    if (dbUser) {
      await db
        .update(usersTable)
        .set({
          availableTime: availableTimeJSON,
        })
        .where(eq(usersTable.userSessionId, user.id))
        .execute();
    } else {
      await db
        .insert(usersTable)
        .values({
          userSessionId: user.id,
          username: user.username || "Anonymous",
          availableTime: availableTimeJSON,
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

// Get /api/user/when
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
      return NextResponse.json(dbUser.availableTime, { status: 200 });
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
