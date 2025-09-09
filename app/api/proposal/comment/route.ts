import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Something went wrong" }, { status: 405 });
  }
  const body: any =await  request.json();
  const { proposalId, comment } = body;
  console.log("body", proposalId, "comment", comment);
  const token = await getToken({ req:request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!proposalId || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
  const userId :string= token.id as string;
  try {
    const author=await prisma.user.findUnique({where:{id:userId}});
    if (!author) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const pComment = await prisma.proposalComment.create({
      data: {
        author:{
          connect:{id:userId}
        },
        content:comment,
        proposal: {
          connect: {
            id: proposalId,
          },
        }
      },
    });

    return NextResponse.json(pComment);
  } catch (error) {
    console.log("Error OCCURED ",error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
