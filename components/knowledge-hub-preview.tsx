import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, ExternalLink, Heart, MessageCircle } from "lucide-react"

export function KnowledgeHubPreview() {
  const recentPosts = [
    {
      id: 1,
      title: "Best Practices for Market Research",
      author: "Sarah Chen",
      category: "Research",
      likes: 12,
      comments: 5,
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "Lessons from Failed Product Launch",
      author: "Mike Johnson",
      category: "Product",
      likes: 8,
      comments: 3,
      timeAgo: "1 day ago",
    },
    {
      id: 3,
      title: "Effective Stakeholder Communication",
      author: "Lisa Wang",
      category: "Communication",
      likes: 15,
      comments: 7,
      timeAgo: "3 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Knowledge Hub
        </CardTitle>
        <CardDescription>Recent lessons and insights from the team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="space-y-2 p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm leading-tight">{post.title}</h4>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/professional-avatar.png" alt={post.author} />
                  <AvatarFallback className="text-xs">
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{post.author}</span>
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {post.comments}
                  </span>
                </div>
                <span>{post.timeAgo}</span>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full bg-transparent" size="sm">
            View All Posts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
