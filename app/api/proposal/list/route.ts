import { SourceType } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(
  req: NextRequest,
) {
    const { searchParams } = new URL(req.url);
  const query= searchParams;
  const page :number = Number(searchParams.get("page")) || 1;
  const limit=Number(searchParams.get("limit"))|| 10;
  const category:string= searchParams.get("category")  || "";
  const search:string= searchParams.get("search") || "";
  const status:string= searchParams.get("status") || "";
  const priority:string= searchParams.get("priority") || "";
  const skip = (page - 1) * Number(limit)
  let queryFind={};
  if (category && category !='all') {
    queryFind = {...queryFind,category:category}
  }
  if (status && status !='all') {
    queryFind = {...queryFind,status:status}
  }
  if (priority && priority !='all') {
    queryFind = {...queryFind,priority:priority}
  }
  if (search ) {
    queryFind = {
      ...queryFind,
      OR: [
        { title: { contains: search } },
        { description: { contains: search } }
      ],
    }
    
  }
  const proposals = await prisma.proposal.findMany({
    where: queryFind,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      assignee: {
        select: {
          name: true,
          avatar: true,
          initials: true,
          role: true,
        },
      },
      reviewer: {
        select: {
          name: true,
          avatar: true,
          initials: true,
          role: true,
        },
      },
      document: {
        select: {
          name: true,
          path: true,
          processed: true,
        },
      },
      score: {
        select: {
          id: true,
          idea: true,
          design:true,
          quality:true,
          overall:true
        },
      },
      comments:{
        select:{
            author:true,
            content:true
        }
      },
    }
  })

  const total = await prisma.proposal.count({
    where: queryFind,
  })
  const totalPages=(total/limit) +1;
  return NextResponse.json({
    proposals,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages
    },
  })
}
