import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Something went wrong" }, { status: 405 });
  }
  const body: any = request.json();
  const { postId, content } = body;
  const token = await getToken({ req:request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const userId :string= token.id as string;
  try {
    const author=await prisma.user.findUnique({where:{id:userId}});
    if (!author) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const comment = await prisma.comment.create({
      data: {
        postId,
        author:{
          connect:{id:userId}
        },
        content,
        authorId:userId
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
