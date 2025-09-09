import { SourceType } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  // get token and use 
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId :string= token.id as string;
  const body = await req.json();
  const { title, summary, content, category, tags, projectName,projectType, 
    eventName,eventDate
     ,lessonType,sources
  } = body;
  const kSources:{
    title :string,
    type:SourceType,
    url:string
  }[]=[];
  if (sources) {
    for (const source of sources) {
      kSources.push({
        title: source.title,
        type: source.type,
        url: source.url,
      });
    }
    
  }
  try {

    // Run everything inside a transaction
    const result = await prisma.$transaction(async (prisma) => {
      let projectId;
      let eventId;

      // Create project if provided
      if (projectName && projectType) {
        const project = await prisma.project.create({
          data: { name: projectName, type: projectType },
        });
        projectId = project.id;
      }

      // Create event if provided
      if (eventName && eventDate) {
        const event = await prisma.event.create({
          data: { name: eventName, date: new Date(eventDate) },
        });
        eventId = event.id;
      }

      // Create knowledge post
      const post = await prisma.knowledgePost.create({
        data: {
          title,
          summary,
          content,
          category,
          lessonType,
          tags: { set: tags },
          author: { connect: { id: userId } },
          project: projectId ? { connect: { id: projectId } } : undefined,
          event: eventId ? { connect: { id: eventId } } : undefined,
        },
      });

      // Create sources if provided
      if (kSources && kSources.length > 0) {
        const sourcePromises = kSources.map((source: any) =>
          prisma.source.create({
            data: {
              title: source.title,
              type: source.type,
              url: source.url,
              post: { connect: { id: post.id } },
            },
          })
        );
        await Promise.all(sourcePromises);
      }

      return post;
    });

    return NextResponse.json({ message: "Post created successfully", post: result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  
}
}
