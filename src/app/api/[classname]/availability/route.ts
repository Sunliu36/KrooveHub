import { NextResponse, type NextRequest } from "next/server";

import { eq, and } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";

// zod is a library that helps us validate data at runtime
// it's useful for validating data coming from the client,
// since typescript only validates data at compile time.
// zod's schema syntax is pretty intuitive,
// read more about zod here: https://zod.dev/

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      classname: string;
    };
  },
) {
  const { classname } = params;
  console.log(classname);
  // Validate the URL parameters

  const availability = {
    Mon: {
      "9:00": 1,
      "10:00": 1,
      "11:00": 1,
      "12:00": 1,
      "13:00": 0,
      "14:00": 1,
      "15:00": 2,
      "16:00": 1,
      "17:00": 0,
      "18:00": 1,
      "19:00": 0,
      "20:00": 1,
      "21:00": 3,
      "22:00": 1,
    },
    Tue: {
      "9:00": 10,
      "10:00": 2,
      "11:00": 0,
      "12:00": 1,
      "13:00": 2,
      "14:00": 1,
      "15:00": 1,
      "16:00": 4,
      "17:00": 2,
      "18:00": 1,
      "19:00": 5,
      "20:00": 0,
      "21:00": 2,
      "22:00": 1,
    },
    Wed: {
      "9:00": 3,
      "10:00": 5,
      "11:00": 1,
      "12:00": 1,
      "13:00": 0,
      "14:00": 1,
      "15:00": 3,
      "16:00": 1,
      "17:00": 0,
      "18:00": 1,
      "19:00": 0,
      "20:00": 1,
      "21:00": 3,
      "22:00": 1,
    },
    Thu: {
      "9:00": 0,
      "10:00": 12,
      "11:00": 4,
      "12:00": 1,
      "13:00": 0,
      "14:00": 1,
      "15:00": 3,
      "16:00": 1,
      "17:00": 0,
      "18:00": 1,
      "19:00": 0,
      "20:00": 1,
      "21:00": 3,
      "22:00": 1,
    },
    Fri: {
      "9:00": 1,
      "10:00": 3,
      "11:00": 1,
      "12:00": 1,
      "13:00": 0,
      "14:00": 1,
      "15:00": 3,
      "16:00": 1,
      "17:00": 1,
      "18:00": 1,
      "19:00": 2,
      "20:00": 1,
      "21:00": 3,
      "22:00": 1,
    },
    Sat: {
      "9:00": 10,
      "10:00": 2,
      "11:00": 0,
      "12:00": 1,
      "13:00": 22,
      "14:00": 1,
      "15:00": 3,
      "16:00": 1,
      "17:00": 6,
      "18:00": 5,
      "19:00": 4,
      "20:00": 3,
      "21:00": 3,
      "22:00": 2,
    },
    Sun: {
      "9:00": 0,
      "10:00": 1,
      "11:00": 1,
      "12:00": 1,
      "13:00": 0,
      "14:00": 1,
      "15:00": 3,
      "16:00": 3,
      "17:00": 2,
      "18:00": 2,
      "19:00": 1,
      "20:00": 1,
      "21:00": 7,
      "22:00": 2,
    },
  };

  return NextResponse.json(availability, { status: 200 });
}
