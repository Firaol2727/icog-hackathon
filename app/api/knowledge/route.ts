import { SourceType } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(
  req: NextRequest,
) {
    const { searchParams } = new URL(req.url);
    // console.log("req.query",searchParams)
  const query= searchParams;
  //  { lessonType, category, page , limit  } =
  const page :number = Number(searchParams.get("page")) || 1;
  const limit=Number(searchParams.get("limit"))|| 10;
  const lessonType:string= searchParams.get("lessonType") || "";
  const category:string= searchParams.get("category")  || "";
  const search:string= searchParams.get("search") || "";
  const skip = (page - 1) * Number(limit)
  let queryFind={};
  if (category && category !='all') {
    queryFind = {...queryFind,category:category}
  }
  if (lessonType  && lessonType !='all') {
    queryFind ={...queryFind,lessonType:lessonType}
  }
  if (search ) {
    queryFind = {
      ...queryFind,
      OR: [
        { title: { contains: search } },
        { summary: { contains: search } },
        { content: { contains: search } },
        // { tags : { contains: search } }
      ],
    }
    
  }
  console.log("Limit ",limit)
  const knowledge = await prisma.knowledgePost.findMany({
    where: queryFind,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
          initials: true,
          role: true,
        },
      },
      project: {
        select: {
          name: true,
          type: true,
        },
      },
      event: {
        select: {
          name: true,
          date: true,
        },
      },
      sources: {
        select: {
          title: true,
          type: true,
          url: true,
        },
      },
      comments:{
        select:{
            author:true,
            content:true
        }
      },
      metrics:{
        select: {
            likes:true,
            comments:true,
            bookmarks:true,
            views:true
        }
      }
    }
  })

  const total = await prisma.knowledgePost.count({
    where: queryFind,
  })
  const totalPages=(total/limit) +1;
  return NextResponse.json({
    knowledge,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages
    },
  })
}
