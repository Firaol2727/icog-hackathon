"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { KnowledgeDetailModal } from "@/components/knowledge-detail-modal"
import { CreateKnowledgeModal } from "@/components/create-knowledge-modal"
import {
  BookOpen,
  Heart,
  MessageCircle,
  Bookmark,
  ExternalLink,
  Calendar,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { KnowledgePost, useKnowledge } from "@/lib/hooks/useKnowledge"
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"


export function KnowledgeGrid({
  currentPage,
  setCurrentPage,
  lessonType,
  setLessonType,
  category,
  setCategory,
  refresh,
  search
}:{
  currentPage:number,
  setCurrentPage:(limit:number) => void,
  lessonType:string,
  setLessonType:(lessonType:string) => void,
  category:string,
  setCategory:(category:string)=>void,
  search:string,
  setSearch:(search:string) => void,
  refresh:any
}) {
  const [selectedPost, setSelectedPost] = useState<KnowledgePost | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [limit, setLimit] = useState(6)
  const  knowledge = useKnowledge({ page:currentPage, limit, category, lessonType,refresh,search })

  // const [category, setCategory] = useState("")
  // const [lessonType, setLessonType] = useState("")
  //  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
    // const totalPages = Math.ceil(knowledgePosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  // const currentPosts = knowledgePosts.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    // if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    // }
  }

  
  // const knowledgePosts: KnowledgePost[] = [
  //   {
  //     id: "1",
  //     title: "Why Our Q3 Product Launch Failed and What We Learned",
  //     summary:
  //       "A detailed analysis of our product launch failure, including market timing issues, communication gaps, and resource allocation problems.",
  //     content: "Our Q3 product launch taught us valuable lessons about market timing and stakeholder alignment...",
  //     category: "Product Management",
  //     tags: ["Product Launch", "Failure Analysis", "Market Timing", "Stakeholder Management"],
  //     author: {
  //       name: "Sarah Chen",
  //       avatar: "/professional-avatar.png",
  //       initials: "SC",
  //       role: "Product Manager",
  //     },
  //     project: {
  //       name: "EcoSmart Product Line",
  //       type: "Product Launch",
  //     },
  //     event: {
  //       name: "Q3 2023 Product Launch",
  //       date: "2023-09-15",
  //     },
  //     lessonType: "failure",
  //     sources: [
  //       {
  //         title: "Post-Launch Analysis Report",
  //         url: "#",
  //         type: "document",
  //       },
  //       {
  //         title: "Market Research Data",
  //         url: "#",
  //         type: "document",
  //       },
  //       {
  //         title: "Customer Feedback Survey Results",
  //         url: "#",
  //         type: "document",
  //       },
  //     ],
  //     metrics: {
  //       likes: 24,
  //       comments: 8,
  //       bookmarks: 12,
  //       views: 156,
  //     },
  //     createdAt: "2 days ago",
  //     updatedAt: "1 day ago",
  //   },
  //   {
  //     id: "2",
  //     title: "Successful Remote Team Collaboration During Crisis",
  //     summary:
  //       "How we maintained productivity and team morale during the pandemic by implementing new communication protocols and tools.",
  //     content: "When the pandemic hit, we had to quickly adapt our team collaboration methods...",
  //     category: "Team Management",
  //     tags: ["Remote Work", "Crisis Management", "Team Collaboration", "Communication"],
  //     author: {
  //       name: "Mike Johnson",
  //       avatar: "/professional-avatar.png",
  //       initials: "MJ",
  //       role: "Team Lead",
  //     },
  //     project: {
  //       name: "Remote Transition Initiative",
  //       type: "Organizational Change",
  //     },
  //     event: {
  //       name: "COVID-19 Remote Transition",
  //       date: "2020-03-15",
  //     },
  //     lessonType: "success",
  //     sources: [
  //       {
  //         title: "Remote Work Best Practices Guide",
  //         url: "#",
  //         type: "document",
  //       },
  //       {
  //         title: "Team Productivity Metrics",
  //         url: "#",
  //         type: "document",
  //       },
  //       {
  //         title: "Harvard Business Review - Remote Teams",
  //         url: "https://hbr.org/remote-teams",
  //         type: "article",
  //       },
  //     ],
  //     metrics: {
  //       likes: 45,
  //       comments: 15,
  //       bookmarks: 28,
  //       views: 234,
  //     },
  //     createdAt: "1 week ago",
  //     updatedAt: "3 days ago",
  //   },
  //   {
  //     id: "3",
  //     title: "Data-Driven Decision Making: A Framework That Works",
  //     summary:
  //       "Our approach to implementing data-driven decision making across departments, including tools, processes, and cultural changes.",
  //     content: "Implementing data-driven decision making required both technical and cultural changes...",
  //     category: "Data & Analytics",
  //     tags: ["Data Analytics", "Decision Making", "Process Improvement", "Culture Change"],
  //     author: {
  //       name: "Lisa Wang",
  //       avatar: "/professional-avatar.png",
  //       initials: "LW",
  //       role: "Data Analyst",
  //     },
  //     project: {
  //       name: "Analytics Transformation",
  //       type: "Process Improvement",
  //     },
  //     event: {
  //       name: "Q2 Analytics Implementation",
  //       date: "2023-06-01",
  //     },
  //     lessonType: "insight",
  //     sources: [
  //       {
  //         title: "Analytics Implementation Guide",
  //         url: "#",
  //         type: "document",
  //       },
  //       {
  //         title: "ROI Analysis Dashboard",
  //         url: "#",
  //         type: "document",
  //       },
  //       {
  //         title: "McKinsey Analytics Report",
  //         url: "https://mckinsey.com/analytics",
  //         type: "article",
  //       },
  //     ],
  //     metrics: {
  //       likes: 32,
  //       comments: 11,
  //       bookmarks: 19,
  //       views: 187,
  //     },
  //     createdAt: "3 days ago",
  //     updatedAt: "2 days ago",
  //   },
  //   {
  //     id: "4",
  //     title: "Budget Overrun Warning Signs We Missed",
  //     summary:
  //       "Early indicators of budget problems that we overlooked, and the monitoring system we built to prevent future overruns.",
  //     content: "Looking back at our budget overrun, there were several warning signs we should have caught earlier...",
  //     category: "Finance & Budget",
  //     tags: ["Budget Management", "Risk Management", "Financial Planning", "Warning Signs"],
  //     author: {
  //       name: "Alex Rodriguez",
  //       avatar: "/professional-avatar.png",
  //       initials: "AR",
  //       role: "Finance Manager",
  //     },
  //     project: {
  //       name: "Marketing Campaign 2023",
  //       type: "Marketing Initiative",
  //     },
  //     event: {
  //       name: "Q4 Budget Review",
  //       date: "2023-12-01",
  //     },
  //     lessonType: "warning",
  //     sources: [
  //       {
  //         title: "Budget Analysis Report",
  //         url: "#",
  //         type: "document",
  //       },
  //       {
  //         title: "Financial Controls Framework",
  //         url: "#",
  //         type: "document",
  //       },
  //     ],
  //     metrics: {
  //       likes: 18,
  //       comments: 6,
  //       bookmarks: 14,
  //       views: 98,
  //     },
  //     createdAt: "5 days ago",
  //     updatedAt: "4 days ago",
  //   },
  // ]

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failure":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "insight":
        return <Lightbulb className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />
    }
  }

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "failure":
        return "bg-red-100 text-red-800 border-red-200"
      case "insight":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "warning":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }
  
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {knowledge?.knowledge && knowledge.knowledge.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge className={getLessonTypeColor(post.lessonType)} variant="outline">
                  <span className="flex items-center gap-1">
                    {getLessonTypeIcon(post.lessonType)}
                    {post.lessonType}
                  </span>
                </Badge>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Bookmark className="h-3 w-3" />
                </Button>
              </div>
              <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Author and Project Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback className="text-xs">{post.author.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{post.project?.name}</p>
                    <p className="text-xs text-muted-foreground">{post.project?.type}</p>
                  </div>
                </div>

                {/* Event Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {post.event?.name} • {post.event?.date}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Sources */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  <span>
                    {post.sources.length} source{post.sources.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      { post.metrics && post.metrics.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.metrics &&  post.metrics.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      { post.metrics && post.metrics.views}
                    </span>
                  </div>
                  <span>{post.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
       {knowledge?.pagination && <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, knowledge.pagination.total)} of {knowledge.pagination.total} knowledge
            posts
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
 
            <div className="flex items-center gap-1">
              {Array.from({ length:knowledge.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === knowledge.pagination.totalPages}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>}
 

      {selectedPost && <KnowledgeDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />}

      {showCreateModal && <CreateKnowledgeModal onClose={() => setShowCreateModal(false)} isOpen={false} />}
    </>
  )
}
