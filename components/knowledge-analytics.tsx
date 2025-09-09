"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Heart } from "lucide-react"

export function KnowledgeAnalytics() {
  const engagementData = [
    { month: "Jan", posts: 8, views: 1240, likes: 156, comments: 89 },
    { month: "Feb", posts: 12, views: 1680, likes: 234, comments: 127 },
    { month: "Mar", posts: 15, views: 2100, likes: 298, comments: 165 },
    { month: "Apr", posts: 11, views: 1890, likes: 267, comments: 143 },
    { month: "May", posts: 18, views: 2450, likes: 356, comments: 198 },
    { month: "Jun", posts: 14, views: 2180, likes: 312, comments: 176 },
  ]

  const categoryData = [
    { name: "Product Management", value: 28, color: "#3b82f6" },
    { name: "Team Management", value: 22, color: "#10b981" },
    { name: "Data & Analytics", value: 18, color: "#f59e0b" },
    { name: "Finance & Budget", value: 15, color: "#ef4444" },
    { name: "Marketing", value: 12, color: "#8b5cf6" },
    { name: "Technical", value: 5, color: "#06b6d4" },
  ]

  const lessonTypeData = [
    { type: "Success Stories", count: 45, engagement: 4.2 },
    { type: "Failure Analysis", count: 38, engagement: 4.8 },
    { type: "Key Insights", count: 52, engagement: 3.9 },
    { type: "Warnings/Risks", count: 21, engagement: 4.5 },
  ]

  const topContributors = [
    { name: "Sarah Chen", posts: 12, likes: 156, avatar: "/professional-avatar.png", initials: "SC" },
    { name: "Mike Johnson", posts: 10, likes: 134, avatar: "/professional-avatar.png", initials: "MJ" },
    { name: "Lisa Wang", posts: 9, likes: 128, avatar: "/professional-avatar.png", initials: "LW" },
    { name: "Alex Rodriguez", posts: 8, likes: 98, avatar: "/professional-avatar.png", initials: "AR" },
    { name: "Emma Thompson", posts: 7, likes: 87, avatar: "/professional-avatar.png", initials: "ET" },
  ]

  const trendingTopics = [
    { topic: "Remote Team Management", posts: 8, growth: "+45%" },
    { topic: "Budget Planning", posts: 6, growth: "+32%" },
    { topic: "Product Launch Failures", posts: 5, growth: "+28%" },
    { topic: "Data-Driven Decisions", posts: 4, growth: "+25%" },
    { topic: "Stakeholder Communication", posts: 3, growth: "+18%" },
  ]

  return (
    <div className="grid gap-6">
      {/* Engagement Trends */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Sharing Trends</CardTitle>
            <CardDescription>Posts and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="posts"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Posts"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>Views, likes, and comments trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} name="Views" />
                <Line type="monotone" dataKey="likes" stroke="#f59e0b" strokeWidth={2} name="Likes" />
                <Line type="monotone" dataKey="comments" stroke="#ef4444" strokeWidth={2} name="Comments" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution and Lesson Types */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Categories</CardTitle>
            <CardDescription>Distribution of posts by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} paddingAngle={2} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lesson Type Performance</CardTitle>
            <CardDescription>Engagement by lesson type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lessonTypeData.map((lesson) => (
                <div key={lesson.type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{lesson.type}</p>
                    <p className="text-sm text-muted-foreground">{lesson.count} posts</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">{lesson.engagement}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">avg engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Contributors and Trending Topics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
            <CardDescription>Most active knowledge sharers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                        <AvatarFallback className="text-xs">{contributor.initials}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium">{contributor.name}</p>
                      <p className="text-sm text-muted-foreground">{contributor.posts} posts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{contributor.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
            <CardDescription>Popular knowledge areas this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div key={topic.topic} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{topic.topic}</p>
                      <p className="text-sm text-muted-foreground">{topic.posts} posts</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {topic.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
