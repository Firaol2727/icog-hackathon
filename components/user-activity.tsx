"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, BookOpen, MessageCircle, Heart, TrendingUp, Calendar, Clock } from "lucide-react"

export function UserActivity() {
  const activityStats = [
    { title: "Proposals Created", value: "12", icon: FileText, color: "text-blue-600" },
    { title: "Knowledge Posts", value: "8", icon: BookOpen, color: "text-green-600" },
    { title: "Comments Made", value: "34", icon: MessageCircle, color: "text-purple-600" },
    { title: "Likes Received", value: "156", icon: Heart, color: "text-red-600" },
  ]

  const recentActivity = [
    {
      type: "proposal",
      action: "Created proposal",
      target: "Q1 Marketing Budget Review",
      time: "2 hours ago",
      status: "draft",
    },
    {
      type: "knowledge",
      action: "Published post",
      target: "Best Practices for Remote Team Management",
      time: "1 day ago",
      status: "published",
    },
    {
      type: "comment",
      action: "Commented on",
      target: "Product Launch Failure Analysis",
      time: "2 days ago",
      status: "active",
    },
    {
      type: "proposal",
      action: "Approved proposal",
      target: "Partnership Agreement - TechCorp",
      time: "3 days ago",
      status: "approved",
    },
    {
      type: "knowledge",
      action: "Updated post",
      target: "Data-Driven Decision Making Framework",
      time: "1 week ago",
      status: "updated",
    },
  ]

  const monthlyGoals = [
    { goal: "Create 5 proposals", current: 3, target: 5, progress: 60 },
    { goal: "Share 3 knowledge posts", current: 2, target: 3, progress: 67 },
    { goal: "Review 10 proposals", current: 8, target: 10, progress: 80 },
    { goal: "Engage with team", current: 15, target: 20, progress: 75 },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "proposal":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "knowledge":
        return <BookOpen className="h-4 w-4 text-green-600" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-purple-600" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "published":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "active":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "updated":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {activityStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
                  This month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(activity.status)} variant="outline">
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals</CardTitle>
            <CardDescription>Track your progress towards monthly objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal.goal}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">{goal.progress}% complete</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
