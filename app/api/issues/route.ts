// route.tsx (API Endpoint Backend):
// * What it does: This file defines the backend API that actually handles the data submission (when the form from page.tsx is submitted).
// * Key Role:
//     - It receives the POST request from the frontend (coming from the form submission).
//     - It validates the data using the zod library to ensure that the title and description meet the required criteria (e.g., minimum length).
//     - If validation passes, it saves the data (title and description) to the database using prisma.
//     - If validation fails, it sends an error message back to the frontend.

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { IssueSchema } from "@/app/ValidationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 200 });
}
