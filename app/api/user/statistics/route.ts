import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const totalMembers=await prisma.user.count({
  })
  const totalActiveUsers=await prisma.user.count({ where:{status:'active'}
  })
  const totalAdmin=await prisma.user.count({where:{role:'admin'}})
  // get the number interms of department 
  return NextResponse.json({
    totalActiveUsers,
    totalAdmin,
    totalMembers
  });
}
