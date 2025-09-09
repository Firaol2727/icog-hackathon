import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest){
  const body:any = request.json()  
  const { id }=body;
  const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const updatedKnowledge = await prisma.knowledgePost.update({
    where: { id },
    data: {
        metrics: {
          update: {
            views: {
              increment: 1,
            },
          },
        },
      },
  })

  return NextResponse.json(updatedKnowledge);
}
