"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProposalDetailModal } from "@/components/proposal-detail-modal"
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Users,
  Eye,
  Upload,
  TrendingUp,
  Lightbulb,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { CreateProposalModal } from "./create-proposal-modal"
import { Proposal, useProposals } from "@/lib/hooks/useProposals"


//  const proposals: Proposal[] = [
//     {
//       id: "1",
//       title: "Q1 2024 Digital Marketing Campaign",
//       description: "Comprehensive digital marketing strategy targeting millennials and Gen Z consumers",
//       status: "in_review",
//       priority: "high",
//       scores: {
//         idea: 8.2,
//         design: 7.5,
//         quality: 6.8,
//         overall: 7.5,
//       },
//       dueDate: "2024-01-15",
//       assignee: {
//         name: "Sarah Chen",
//         avatar: "/professional-avatar.png",
//         initials: "SC",
//       },
//       reviewer: {
//         name: "Mike Johnson",
//         avatar: "/professional-avatar.png",
//         initials: "MJ",
//       },
//       document: {
//         name: "Digital_Marketing_Proposal_Q1.pdf",
//         size: "2.4 MB",
//         uploadedAt: "2 hours ago",
//         processed: true,
//       },
//       lastUpdated: "2 hours ago",
//       tags: ["Marketing", "Digital", "Q1"],
//       suggestions: ""
//     },
//     {
//       id: "2",
//       title: "Product Launch Strategy - EcoSmart Line",
//       description: "Go-to-market strategy for new sustainable product line launch",
//       status: "in_review",
//       priority: "critical",
//       scores: {
//         idea: 9.1,
//         design: 8.3,
//         quality: 7.9,
//         overall: 8.4,
//       },
//       dueDate: "2024-01-20",
//       assignee: {
//         name: "Lisa Wang",
//         avatar: "/professional-avatar.png",
//         initials: "LW",
//       },
//       reviewer: {
//         name: "David Kim",
//         avatar: "/professional-avatar.png",
//         initials: "DK",
//       },
//       document: {
//         name: "EcoSmart_Launch_Strategy.docx",
//         size: "3.1 MB",
//         uploadedAt: "30 minutes ago",
//         processed: false,
//       },
//       lastUpdated: "1 day ago",
//       tags: ["Product", "Launch", "Sustainability"],
//       suggestions: ""
//     },
//     {
//       id: "3",
//       title: "Partnership Agreement - TechCorp Integration",
//       description: "Strategic partnership proposal for technology integration and co-marketing",
//       status: "approved",
//       priority: "medium",
//       scores: {
//         idea: 7.8,
//         design: 8.9,
//         quality: 9.2,
//         overall: 8.6,
//       },
//       dueDate: "2024-01-10",
//       assignee: {
//         name: "Alex Rodriguez",
//         avatar: "/professional-avatar.png",
//         initials: "AR",
//       },
//       reviewer: {
//         name: "Jennifer Lee",
//         avatar: "/professional-avatar.png",
//         initials: "JL",
//       },
//       document: {
//         name: "TechCorp_Partnership_Proposal.pdf",
//         size: "1.8 MB",
//         uploadedAt: "3 days ago",
//         processed: true,
//       },
//       lastUpdated: "3 days ago",
//       tags: ["Partnership", "Technology", "Integration"],
//       suggestions: ""
//     },
//     {
//       id: "4",
//       title: "Market Research - European Expansion",
//       description: "Comprehensive market analysis for potential European market entry",
//       status: "revision_needed",
//       priority: "high",
//       scores: {
//         idea: 6.5,
//         design: 5.8,
//         quality: 6.2,
//         overall: 6.2,
//       },
//       dueDate: "2024-01-25",
//       assignee: {
//         name: "Emma Thompson",
//         avatar: "/professional-avatar.png",
//         initials: "ET",
//       },
//       reviewer: {
//         name: "Carlos Martinez",
//         avatar: "/professional-avatar.png",
//         initials: "CM",
//       },
//       document: {
//         name: "European_Market_Research.pptx",
//         size: "4.2 MB",
//         uploadedAt: "5 hours ago",
//         processed: true,
//       },
//       lastUpdated: "5 hours ago",
//       tags: ["Research", "Expansion", "Europe"],
//       suggestions: ""
//     },
//   ]
export function ProposalList({
  isAddModalOpen,setIsAddModalOpen,
  status,
  priority,
  search
}:{
  isAddModalOpen: boolean
  setIsAddModalOpen: (isOpen: boolean) => void
  status: string
  priority: string
  search: string
}) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
    const data =useProposals({page,limit,search,status,priority,refresh:isAddModalOpen})
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_review":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "draft":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "revision_needed":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "processing":
        return <Upload className="h-4 w-4 text-purple-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_review":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "draft":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "revision_needed":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "processing":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-amber-600"
    return "text-red-600"
  }
  //  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
    // const totalPages = Math.ceil(knowledgePosts.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  // const currentPosts = knowledgePosts.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setPage(page)
  }

  const goToPrevious = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const goToNext = () => {
    // if (currentPage < totalPages) {
      setPage(page + 1)
    // }
  }


  return (
    <>
      <div className="grid gap-6">
        {data && data.proposals.map((proposal) => (
          <Card key={proposal.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(proposal.status)}
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{proposal.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(proposal.status)}>{proposal.status.replace("-", " ")}</Badge>
                  <Badge className={getPriorityColor(proposal.priority)}>{proposal.priority}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposal.score ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">AI Analysis Scores</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className={`text-sm font-semibold ${getScoreColor(proposal.score.overall)}`}>
                          {proposal.score.overall}/10
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Lightbulb className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Idea</span>
                        </div>
                        <div className={`text-lg font-bold ${getScoreColor(proposal.score.idea)}`}>
                          {proposal.score.idea}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Target className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Design</span>
                        </div>
                        <div className={`text-lg font-bold ${getScoreColor(proposal.score.design)}`}>
                          {proposal.score.design}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Quality</span>
                        </div>
                        <div className={`text-lg font-bold ${getScoreColor(proposal.score.quality)}`}>
                          {proposal.score.quality}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-4 text-muted-foreground">
                    <Upload className="h-5 w-5 mr-2 animate-pulse" />
                    <span className="text-sm">Processing document for AI analysis...</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{proposal.document.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {proposal.document.size} • Uploaded {proposal.document.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {proposal.document.processed ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Analyzed
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-800">Processing...</Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Due: {proposal.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                    {/* <span>{proposal.budget}</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={proposal.assignee.avatar || "/placeholder.svg"} alt={proposal.assignee.name} />
                      <AvatarFallback className="text-xs">{proposal.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span>{proposal.assignee.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={proposal.reviewer?.avatar || "/placeholder.svg"} alt={proposal.reviewer?.name} />
                      <AvatarFallback className="text-xs">{proposal.reviewer?.initials}</AvatarFallback>
                    </Avatar>
                    <span>{proposal.reviewer?.name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {proposal.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProposal(proposal)}
                      className="bg-transparent"
                    >
                      View Analysis
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data?.pagination && <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, data.pagination.total)} of {data.pagination.total} knowledge
            posts
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPrevious} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
 
            <div className="flex items-center gap-1">
              {Array.from({ length:data.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === data.pagination.totalPages? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={goToNext} disabled={page === data.pagination.totalPages}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>}
      {selectedProposal && (
        <ProposalDetailModal proposal={selectedProposal} onClose={() => setSelectedProposal(null)} />
      )}
      {
        isAddModalOpen && (
          <CreateProposalModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
        )
      }
    </>
  )
}
