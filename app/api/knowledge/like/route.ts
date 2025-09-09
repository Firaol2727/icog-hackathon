import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return  NextResponse.json({ message: "Method not allowed"});
  }
  const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const body:any=req.json();
  const {postId}=body;
  try {
    const post = await prisma.knowledgePost.update({
      where: { id: postId },
      data: {
        metrics: {
          update: {
            likes: {
              increment: 1,
            },
          },
        },
      },
    });

    return NextResponse.json(post);
    // res.status(200).json(post);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
    //res.status(500).json({ message: "Internal Server Error" });
  }
}
