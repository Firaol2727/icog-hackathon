
import { useState, useEffect } from "react"
// import { Proposal } from "../generated/prisma";
// import { KnowledgePost } from "@/lib/generated/prisma"
export interface Proposal {
  id: string
  title: string
  description: string
  status:  "in_review" | "approved" | "rejected" | "revision_needed" 
  priority: "low" | "medium" | "high" | "critical"
  suggestions:string
  score: {
    idea: number
    design: number
    quality: number
    overall: number
  }
  dueDate: string
  // budget: string
  assignee: {
    name: string
    avatar: string
    initials: string
  }
  reviewer: {
    name: string
    avatar: string
    initials: string
  }
  document: {
    name: string
    path:string
    size: string
    uploadedAt: string
    processed: boolean
  }
  lastUpdated: string
  tags: string[]
}
export interface ProposalsPaginated {
    proposals: Proposal[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages:number;
    }
}
export function useProposals({page,limit,search,
    status,
    priority,
    refresh
}:{
    page:number,
    limit:number,
    search:string,
    status:string,
    priority:string
    refresh:any,
}) {
  const [users, setUsers] = useState<ProposalsPaginated>()

  useEffect(() => {
    const fetchProposals = async () => {
      let  url=`/api/proposal/list?page=${page}&limit=${limit}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      if (status) {
        url = url + `&status=${status}`;
      }
      if (priority) {
        url = url + `&priority=${priority}`;
      }
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error("Failed to fetch proposals")
      }
      const data = await res.json()
      setUsers(data)
    }
    fetchProposals()
  }, [page,limit,search, status,priority,refresh])

  return users
}
