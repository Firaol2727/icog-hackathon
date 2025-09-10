"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Calendar,
  DollarSign,
  Users,
  Download,
  Upload,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Target,
  Lightbulb,
} from "lucide-react"
import { Proposal } from "@/lib/hooks/useProposals"

import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify"

export default function Suggestions({ proposal }: { proposal: Proposal }) {
  return (
    <div className="prose max-w-none space-y-4">
      <ReactMarkdown>{proposal.suggestions}</ReactMarkdown>
    </div>
  );
}

interface ProposalDetailModalProps {
  proposal: Proposal
  onClose: () => void
}

export function ProposalDetailModal({ proposal, onClose }: ProposalDetailModalProps) {
  const [recommendations] = useState([
    {
      id: 1,
      category: "Idea Enhancement",
      priority: "high",
      title: "Strengthen Value Proposition",
      description:
        "The core value proposition needs more quantifiable benefits. Consider adding specific ROI metrics and competitive advantages.",
      impact: "High",
      effort: "Medium",
    },
    {
      id: 2,
      category: "Design Improvement",
      priority: "medium",
      title: "Enhance Visual Presentation",
      description:
        "Include more detailed mockups and user journey flows. Visual elements should better support the narrative.",
      impact: "Medium",
      effort: "Low",
    },
    {
      id: 3,
      category: "Quality Assurance",
      priority: "high",
      title: "Add Risk Mitigation Plan",
      description:
        "Include comprehensive risk assessment and mitigation strategies. Address potential technical and market challenges.",
      impact: "High",
      effort: "High",
    },
    {
      id: 4,
      category: "Market Analysis",
      priority: "medium",
      title: "Expand Competitive Analysis",
      description: "Provide deeper analysis of competitor strategies and market positioning. Include SWOT analysis.",
      impact: "Medium",
      effort: "Medium",
    },
    {
      id: 5,
      category: "Financial Planning",
      priority: "low",
      title: "Detailed Budget Breakdown",
      description:
        "Break down costs into more granular categories. Include contingency planning and phased investment options.",
      impact: "Low",
      effort: "Low",
    },
  ])

  const [comments] = useState([
    {
      id: 1,
      author: "AI Review System",
      avatar: "/professional-avatar.png",
      initials: "AI",
      content:
        "Document processed successfully. Overall score: 7.2/10. Key strengths identified in market opportunity and technical feasibility.",
      timestamp: "2 hours ago",
      type: "system",
    },
    {
      id: 2,
      author: "Sarah Chen",
      avatar: "/professional-avatar.png",
      initials: "SC",
      content:
        "The AI scoring seems accurate. I agree with the recommendation to strengthen the value proposition section.",
      timestamp: "4 hours ago",
      type: "feedback",
    },
    {
      id: 3,
      author: "Mike Johnson",
      avatar: "/professional-avatar.png",
      initials: "MJ",
      content: "Uploaded revised version with enhanced financial projections. Requesting re-analysis.",
      timestamp: "1 day ago",
      type: "update",
    },
  ])

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-amber-600"
    return "text-red-600"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const [comment , setComment] = useState('')
  const handleCommentSubmit=() => {
    console.log("Comment:", comment);
    console.log("Proposal ID:", proposal.id);
    fetch("/api/proposal/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, proposalId: proposal.id }),
    }).then((res) => {
      toast.success("Comment submitted successfully");
      onClose();

    }).catch((err) => {
        toast.error(err.message);
        
    })
  }
  function handleDownload(fileName: string) {
  // file is served from public/uploads
    // setCreateComment({comment: ""})
  const url = `/uploads/${fileName}`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName); // force download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{proposal.title}</DialogTitle>
              <DialogDescription className="mt-2">{proposal.description}</DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Re-upload
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="scores" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scores">AI Scores</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="document">Document</TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Idea Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${getScoreColor(proposal.score.idea)}`}>
                    {proposal.score.idea}/10
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(proposal.score.idea / 2) ? "fill-current text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Design Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${getScoreColor(proposal.score.design)}`}>
                    {proposal.score.design}/10
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(proposal.score.design / 2) ? "fill-current text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Quality Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${getScoreColor(proposal.score.quality)}`}>
                    {proposal.score.quality}/10
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(proposal.score.quality / 2) ? "fill-current text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${getScoreColor(proposal.score.overall)}`}>
                    {proposal.score.overall}/10
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(proposal.score.overall / 2) ? "fill-current text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Idea & Innovation
                      </span>
                      <span className={`font-semibold ${getScoreColor(proposal.score.idea)}`}>
                        {proposal.score.idea}/10
                      </span>
                    </div>
                    <Progress value={proposal.score.idea * 10} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Evaluates originality, market opportunity, and innovation potential
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Design & Presentation
                      </span>
                      <span className={`font-semibold ${getScoreColor(proposal.score.design)}`}>
                        {proposal.score.design}/10
                      </span>
                    </div>
                    <Progress value={proposal.score.design * 10} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Assesses visual design, user experience, and presentation quality
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Quality & Feasibility
                      </span>
                      <span className={`font-semibold ${getScoreColor(proposal.score.quality)}`}>
                        {proposal.score.quality}/10
                      </span>
                    </div>
                    <Progress value={proposal.score.quality * 10} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Reviews technical feasibility, implementation plan, and risk assessment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Due Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{proposal.dueDate}</p>
                </CardContent>
              </Card>


              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Assignee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={proposal.assignee.avatar || "/placeholder.svg"} alt={proposal.assignee.name} />
                      <AvatarFallback className="text-xs">{proposal.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{proposal.assignee.name}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  AI-Generated Recommendations
                </CardTitle>
                <DialogDescription>
                  Based on the analysis of your proposal, here are specific actions to improve your scores
                </DialogDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              { Suggestions ({ proposal:proposal }) }
              {/* {proposal.suggestions} */}
              {/* {recommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{rec.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {rec.category}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority} priority</Badge>
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div>Impact: {rec.impact}</div>
                        <div>Effort: {rec.effort}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </CardContent>
                </Card>
              ))} */}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Textarea onChange={(e) => setComment(e.target.value)} placeholder="Add your feedback or questions about the AI analysis..." />
                  <Button onClick={handleCommentSubmit} size="sm">Post Comment</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {proposal.comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name[0]} />
                        <AvatarFallback className="text-xs">{comment.author.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          {/* <Badge variant="outline" className="text-xs">
                            {comment.}
                          </Badge> */}
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="document" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Proposal Document</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{proposal.document.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {proposal.document.size} • Uploaded {proposal.document.uploadedAt}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {proposal.document.processed ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Processed
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800">Processing...</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"
                      onClick={() => handleDownload(proposal.document.path)}
                      >
                        <Download className="h-4 w-4 mr-2"
                         />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Replace
                      </Button>
                    </div>
                  </div>

                  {proposal.document.processed && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Processing Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pages analyzed:</span>
                          <span className="font-medium">24</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Key sections identified:</span>
                          <span className="font-medium">8</span>
                        </div>
                        {/* <div className="flex justify-between text-sm">
                          <span>Processing time:</span>
                          <span className="font-medium">2.3 seconds</span>
                        </div> */}
                        <div className="flex justify-between text-sm">
                          <span>Confidence level:</span>
                          <span className="font-medium text-green-600">94%</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
