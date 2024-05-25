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
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 0,
      14: 1,
      15: 2,
      16: 1,
      17: 0,
      18: 1,
      19: 0,
      20: 1,
      21: 3,
      22: 1,
    },
    2: {
      8: 1,
      9: 10,
      10: 2,
      11: 0,
      12: 1,
      13: 2,
      14: 1,
      15: 1,
      16: 4,
      17: 2,
      18: 1,
      19: 5,
      20: 0,
      21: 2,
      22: 1,
    },
    3: {
      8: 1,
      9: 3,
      10: 5,
      11: 1,
      12: 1,
      13: 0,
      14: 1,
      15: 3,
      16: 1,
      17: 0,
      18: 1,
      19: 0,
      20: 1,
      21: 3,
      22: 1,
    },
    4: {
      8: 1,
      9: 0,
      10: 12,
      11: 4,
      12: 1,
      13: 0,
      14: 1,
      15: 3,
      16: 1,
      17: 0,
      18: 1,
      19: 0,
      20: 1,
      21: 3,
      22: 1,
    },
    5: {
      8: 1,
      9: 1,
      10: 3,
      11: 1,
      12: 1,
      13: 0,
      14: 1,
      15: 3,
      16: 1,
      17: 1,
      18: 1,
      19: 2,
      20: 1,
      21: 3,
      22: 1,
    },
    6: {
      8: 1,
      9: 10,
      10: 2,
      11: 0,
      12: 1,
      13: 22,
      14: 1,
      15: 3,
      16: 1,
      17: 6,
      18: 5,
      19: 4,
      20: 3,
      21: 3,
      22: 2,
    },
    0: {
      8: 1,
      9: 0,
      10: 1,
      11: 1,
      12: 1,
      13: 0,
      14: 1,
      15: 3,
      16: 3,
      17: 2,
      18: 2,
      19: 1,
      20: 1,
      21: 7,
      22: 2,
    },
  };

  return NextResponse.json(availability, { status: 200 });
}
