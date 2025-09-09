import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page: number = Number(searchParams.get("page")) || 1;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const search : string|null =searchParams.get('search')
  const role:string |null =searchParams.get('role')
  const skip = (page - 1) * limit;
  let queryFind={};
  if (search ) {
    queryFind = {
      ...queryFind,
      OR: [
        { name: { contains: search } },
        { email: { contains: search } },
      ],
    }
    
  }
  if(role && role!='all'){
    queryFind = {
        role:role,
      ...queryFind
    }
  }
  console.log("Query ",queryFind)
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    where:queryFind
    // orderBy: {
    //   createdAt: "desc",
    // },
  });
  const total=await prisma.user.count({
    where:queryFind
  });
  const totalPages=(total/limit)+1;

  return NextResponse.json({
    users,
    pagination:{
        page,
        limit,
        total,
        totalPages
    }
  });
}
