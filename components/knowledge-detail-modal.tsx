"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Bookmark,
  Share2,
  ExternalLink,
  Calendar,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  FileText,
  Video,
  Globe,
} from "lucide-react"
import { KnowledgePost } from "@/lib/hooks/useKnowledge"


interface KnowledgeDetailModalProps {
  post: KnowledgePost
  onClose: () => void
}

export function KnowledgeDetailModal({ post, onClose }: KnowledgeDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const [comments] = useState([
    {
      id: 1,
      author: "David Kim",
      avatar: "/professional-avatar.png",
      initials: "DK",
      role: "Senior Manager",
      content:
        "This is exactly what we experienced in our Q2 launch. The market timing insight is particularly valuable.",
      timestamp: "2 hours ago",
      likes: 3,
    },
    {
      id: 2,
      author: "Emma Thompson",
      avatar: "/professional-avatar.png",
      initials: "ET",
      role: "Product Lead",
      content:
        "Thanks for sharing this! We're planning a similar launch and this will help us avoid the same pitfalls.",
      timestamp: "4 hours ago",
      likes: 5,
    },
  ])

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "failure":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "insight":
        return <Lightbulb className="h-5 w-5 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "website":
      case "article":
        return <Globe className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getLessonTypeIcon(post.lessonType)}
                <Badge variant="outline" className="capitalize">
                  {post.lessonType}
                </Badge>
                <Badge variant="secondary">{post.category}</Badge>
              </div>
              <DialogTitle className="text-xl leading-tight">{post.title}</DialogTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-600" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {post.metrics?.likes ||0}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-blue-600" : ""}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="sources">Sources & References</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Author and Project Info */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-sm text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{post.project?.name}</p>
                    <p className="text-sm text-muted-foreground">{post.project?.type}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Event: {post.event?.name} • {post.event?.date}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Lessons Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p>{post.content}</p>

                  {/* Expanded content based on lesson type */}
                  {post.lessonType === "failure" && (
                    <div className="mt-6 space-y-4">
                      {/* {post.content} */}
                      {/* <h4 className="font-semibold text-red-800">What Went Wrong</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Market timing was off - launched during competitor's major announcement</li>
                        <li>Insufficient stakeholder alignment on key messaging</li>
                        <li>Resource allocation didn't match actual requirements</li>
                        <li>Customer feedback loop was established too late in the process</li>
                      </ul>

                      <h4 className="font-semibold text-green-800">Key Takeaways</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Always conduct competitive landscape analysis before setting launch dates</li>
                        <li>Establish clear communication protocols with all stakeholders early</li>
                        <li>Build in 20% buffer for resource planning</li>
                        <li>Set up customer feedback channels during development, not after launch</li>
                      </ul>

                      <h4 className="font-semibold text-blue-800">Preventive Measures</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Implemented monthly competitive intelligence reports</li>
                        <li>Created stakeholder alignment checklist for all major initiatives</li>
                        <li>Established resource planning templates with built-in buffers</li>
                        <li>Developed early customer feedback integration process</li>
                      </ul> */}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              {post.tags && <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>}
            </Card>

            {/* Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{post.metrics?.views || 0}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{post.metrics?.likes || 0}</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{post.metrics?.comments || 0}</div>
                    <div className="text-sm text-muted-foreground">Comments</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{post.metrics?.bookmarks || 0}</div>
                    <div className="text-sm text-muted-foreground">Bookmarks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sources & References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {post.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getSourceIcon(source.type)}
                        <div>
                          <p className="font-medium">{source.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">{source.type}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Textarea placeholder="Share your thoughts, similar experiences, or questions..." />
                  <Button size="sm">Post Comment</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                        <AvatarFallback className="text-xs">{comment.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.role}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            <Heart className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
