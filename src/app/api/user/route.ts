import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const postUserRequestSchema = z.object({
  walletAddress: z.string(),
  username: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type PostUserRequest = z.infer<typeof postUserRequestSchema>;

// // POST /api/users
// /// Create User
// export async function POST(req: NextRequest) {
//   const user = await currentUser();
//   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     // Saving the new user to the database
//     if (!user.username) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 },
//       );
//     }
//     //find userSessionId in the database if not found create a new user yes update the lastLoginAt
//     const dbUser = await db.query.usersTable.findFirst({
//       where: eq(usersTable.userSessionId, user.id)
//     });
//     if (dbUser) {
//       await db
//       .update(usersTable)
//       .set({
//         lastLoginAt: new Date().toISOString(),
//       })
//       .where(eq(usersTable.userSessionId, user.id))
//       .execute();
//     }else{
//       await db
//         .insert(usersTable)
//         .values({
//           userSessionId: user.id,
//           username: user.username,
//           lastLoginAt: new Date().toISOString(),
//         })
//         .execute();
//     }

//     return NextResponse.json({ id: user.id }, { status: 200 });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }
