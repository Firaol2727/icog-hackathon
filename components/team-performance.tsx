"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Trophy, Target, Clock, BookOpen, TrendingUp } from "lucide-react"

export function TeamPerformance() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      avatar: "/professional-avatar.png",
      initials: "SC",
      proposals: { submitted: 8, approved: 7, avgDays: 2.8 },
      knowledge: { posts: 12, likes: 156, engagement: 4.2 },
      performance: 92,
    },
    {
      name: "Mike Johnson",
      role: "Team Lead",
      avatar: "/professional-avatar.png",
      initials: "MJ",
      proposals: { submitted: 6, approved: 6, avgDays: 2.1 },
      knowledge: { posts: 10, likes: 134, engagement: 4.5 },
      performance: 95,
    },
    {
      name: "Lisa Wang",
      role: "Data Analyst",
      avatar: "/professional-avatar.png",
      initials: "LW",
      proposals: { submitted: 5, approved: 4, avgDays: 3.2 },
      knowledge: { posts: 9, likes: 128, engagement: 3.9 },
      performance: 88,
    },
    {
      name: "Alex Rodriguez",
      role: "Finance Manager",
      avatar: "/professional-avatar.png",
      initials: "AR",
      proposals: { submitted: 7, approved: 5, avgDays: 3.5 },
      knowledge: { posts: 8, likes: 98, engagement: 3.7 },
      performance: 85,
    },
  ]

  const departmentData = [
    { department: "Product", proposals: 18, knowledge: 25, efficiency: 92 },
    { department: "Marketing", proposals: 15, knowledge: 20, efficiency: 88 },
    { department: "Finance", proposals: 8, knowledge: 12, efficiency: 85 },
    { department: "Operations", proposals: 6, knowledge: 8, efficiency: 90 },
  ]

  const skillsData = [
    { skill: "Proposal Writing", teamAvg: 85, benchmark: 80 },
    { skill: "Knowledge Sharing", teamAvg: 88, benchmark: 75 },
    { skill: "Review Speed", teamAvg: 82, benchmark: 85 },
    { skill: "Collaboration", teamAvg: 90, benchmark: 80 },
    { skill: "Innovation", teamAvg: 87, benchmark: 78 },
    { skill: "Documentation", teamAvg: 84, benchmark: 82 },
  ]

  const monthlyProductivity = [
    { month: "Jan", proposals: 12, knowledge: 8, reviews: 15 },
    { month: "Feb", proposals: 15, knowledge: 12, reviews: 18 },
    { month: "Mar", proposals: 18, knowledge: 15, reviews: 22 },
    { month: "Apr", proposals: 14, knowledge: 11, reviews: 19 },
    { month: "May", proposals: 20, knowledge: 18, reviews: 25 },
    { month: "Jun", proposals: 16, knowledge: 14, reviews: 21 },
  ]

  return (
    <div className="grid gap-6">
      {/* Team Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8h</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-red-600" />
              -15% faster
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Knowledge Score</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +0.3 improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Performance and Department Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Individual Performance</CardTitle>
            <CardDescription>Team member contributions and efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {member.performance}%
                    </Badge>
                  </div>
                  <Progress value={member.performance} className="h-2" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">
                        {member.proposals.approved}/{member.proposals.submitted}
                      </div>
                      <div className="text-muted-foreground">Proposals</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{member.knowledge.posts}</div>
                      <div className="text-muted-foreground">Knowledge</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{member.proposals.avgDays}d</div>
                      <div className="text-muted-foreground">Avg Review</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Comparison</CardTitle>
            <CardDescription>Performance across different departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="proposals" fill="#3b82f6" name="Proposals" />
                <Bar dataKey="knowledge" fill="#10b981" name="Knowledge Posts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis and Monthly Productivity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Skills Analysis</CardTitle>
            <CardDescription>Performance vs industry benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Team Average" dataKey="teamAvg" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Benchmark" dataKey="benchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Productivity</CardTitle>
            <CardDescription>Team output trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyProductivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="proposals" fill="#3b82f6" name="Proposals" />
                <Bar dataKey="knowledge" fill="#10b981" name="Knowledge" />
                <Bar dataKey="reviews" fill="#f59e0b" name="Reviews" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
