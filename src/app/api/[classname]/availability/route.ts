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
    1: {
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
    },
    2: {
      9: 0,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
    },
    3: {
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
    },
    4: {
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 1,
      18: 1,
      19: 1,
      20: 1,
      21: 1,
      22: 1,
    },
    5: {
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
    },
    6: {
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
    },
    0: {
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 1,
      19: 1,
      20: 1,
      21: 1,
      22: 1,
    },
  };

  return NextResponse.json(availability, { status: 200 });
}
