import { IssueSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

   const session = await auth();

   if(!session){
    return NextResponse.json({Message: 'Not Authenticated'}, {status: 401})
   }

  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue does not exist" });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check for an active session using the auth function
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })
  }

  await prisma.issue.delete({
    where: { id: issue.id },
  })

  return NextResponse.json({})
}