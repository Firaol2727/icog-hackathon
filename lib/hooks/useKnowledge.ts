
import { useState, useEffect } from "react"
// import { KnowledgePost } from "@/lib/generated/prisma"
export interface KnowledgePost {
  id: string
  title: string
  summary: string
  content: string
  category: string
  tags: string[]
  authorId: string
  projectId: string
  eventId: string
  lessonType: "success" | "failure" | "insight" | "warning"
  createdAt: string
  updatedAt: string
  author: {
    name: string
    avatar: string
    initials: string
    role: string
  }
  project: {
    name: string
    type: string
  }
  event: {
    name: string
    date: string
  }
  sources: Array<{
    title: string
    url: string
    type: "document" | "website" | "video" | "article"
  }>
  metrics: {
    likes: number
    comments: number
    bookmarks: number
    views: number
  }
}
export interface KnowledgePaginated {
    knowledge: KnowledgePost[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages:number;
    }
}
export function useKnowledge({page,limit,category,lessonType

}:{
    page:number,
    limit:number,
    category?:string,
    lessonType?:string,
    // tag:st

}) {
  const [knowledge, setKnowledge] = useState<KnowledgePaginated>()

  useEffect(() => {
    const fetchKnowledge = async () => {
      let  url=`/api/knowledge/?page=${page}&limit=${limit}`;
      if (category) {
        url = url + `&category=${category}`;
      }
      if (lessonType) {
        url = url + `&lessonType=${lessonType}`;
      }
      const res = await fetch(url)
      const data = await res.json()
      console.log("Data from useKnowledge:", data)
      setKnowledge(data)
    }
    fetchKnowledge()
  }, [page,limit,category,lessonType])

  return knowledge
}
