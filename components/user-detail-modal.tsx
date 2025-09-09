"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Crown,
  Shield,
  User as UserIcon,
  FileText,
  BookOpen,
  MessageCircle,
  Heart,
  Edit,
  UserX,
  RotateCcw,
  MoreHorizontal,
  Brain,
  TrendingUp,
  Award,
  Target,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/lib/hooks/useUsers"
import { useEffect, useState } from "react"



interface UserDetailModalProps {
  user: User
  onClose: () => void
  onEdit?: (user: User) => void
}
interface AIUserDetail{
  userId: string;
  knowledgeDescription: string;
  growthOpportunities: string[];
  interestAreas: string[];
}
export function UserDetailModal({ user, onClose, onEdit }: UserDetailModalProps) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-600" />
      case "manager":
        return <Shield className="h-4 w-4 text-blue-600" />
      case "user":
        return <UserIcon className="h-4 w-4 text-gray-600" />
      default:
        return <UserIcon className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "user":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Mock activity data - in real app this would come from props or API
  const activityStats = [
    { title: "Proposals Created", value: "8", icon: FileText, color: "text-blue-600" },
    { title: "Knowledge Posts", value: "5", icon: BookOpen, color: "text-green-600" },
    { title: "Comments Made", value: "23", icon: MessageCircle, color: "text-purple-600" },
    { title: "Likes Received", value: "89", icon: Heart, color: "text-red-600" },
  ]

  const recentActivity = [
    {
      action: "Created proposal",
      target: "Q1 Marketing Budget Review",
      time: "2 hours ago",
      type: "proposal",
    },
    {
      action: "Published post",
      target: "Remote Team Best Practices",
      time: "1 day ago",
      type: "knowledge",
    },
    {
      action: "Commented on",
      target: "Product Launch Analysis",
      time: "2 days ago",
      type: "comment",
    },
  ]

  const permissions = [
    { name: "Create Proposals", granted: true },
    { name: "Edit All Proposals", granted: user.role !== "user" },
    { name: "Approve Proposals", granted: user.role === "admin" || user.role === "manager" },
    { name: "Manage Users", granted: user.role === "admin" },
    { name: "View Analytics", granted: true },
    { name: "System Settings", granted: user.role === "admin" },
  ]

  // AI-generated knowledge insights data
  const knowledgeInsights = {
    overallScore: 8.7,
    strengths: [
      "Exceptional analytical thinking and problem-solving capabilities",
      "Strong leadership skills with proven team management experience",
      "Deep expertise in market analysis and strategic planning",
      "Excellent communication and stakeholder management abilities",
    ],
    growthAreas: [
      "Could benefit from advanced data visualization techniques",
      "Opportunity to expand knowledge in emerging AI/ML technologies",
      "Consider developing cross-functional collaboration skills",
    ],
    keyContributions: [
      "Led successful Q3 market expansion initiative resulting in 23% revenue growth",
      "Developed innovative proposal review framework adopted company-wide",
      "Mentored 5 junior team members, with 4 receiving promotions",
      "Published 12 knowledge articles with average 4.8/5 rating",
    ],
    learningPath: [
      "Advanced Analytics & Data Science",
      "Strategic Leadership Development",
      "Digital Transformation Methodologies",
      "Cross-Cultural Team Management",
    ],
  }

  const [AIdetail , setDetail] = useState<AIUserDetail>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`api/user/detail?id=${user.id}`).then((res) => res.json()).then((data) => {
      console.log(data)
      setDetail(data.detail);
      setLoading(false);
    }).catch((err) => console.log(err))
  },[])
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>User Details</DialogTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEdit?.(user)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <UserX className="mr-2 h-4 w-4" />
                  {user.status === "active" ? "Deactivate User" : "Activate User"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogHeader>

        {/* Tabbed interface for Basic Information and Knowledge Gained */}
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="knowledge">AI Knowledge Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* User Profile Overview */}
              <Card className="md:col-span-1">
                <CardHeader className="text-center">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-xl">{user.initials}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {user.name}
                    {getRoleIcon(user.role)}
                  </CardTitle>
                  <CardDescription className="capitalize">{user.role}</CardDescription>
                  <div className="flex gap-2 justify-center">
                    <Badge className={getRoleColor(user.role)} variant="outline">
                      {user.role}
                    </Badge>
                    <Badge className={getStatusColor(user.status)} variant="outline">
                      {user.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="break-all">{user.email}</span>
                  </div>
                  {user.bio && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{user.bio}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{user.department}</span>
                  </div>
                  {user.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {
                  /* <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Last active: {user.lastActive}</span>
                  </div>
                  {user.joinDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined: {user.joinDate}</span>
                    </div>
                  )} */}
                </CardContent>
              </Card>

              {/* Activity & Permissions */}
              <div className="md:col-span-2 space-y-6">
                {/* Activity Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Overview</CardTitle>
                    <CardDescription>User contributions and engagement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {activityStats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                          <div key={index} className="text-center">
                            <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.title}</div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions and contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="mt-1">
                            {activity.type === "proposal" && <FileText className="h-4 w-4 text-blue-600" />}
                            {activity.type === "knowledge" && <BookOpen className="h-4 w-4 text-green-600" />}
                            {activity.type === "comment" && <MessageCircle className="h-4 w-4 text-purple-600" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="text-muted-foreground">{activity.action}</span>{" "}
                              <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Permissions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Permissions & Access</CardTitle>
                    <CardDescription>Current role-based permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {permissions.map((permission, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded border">
                          <span className="text-sm font-medium">{permission.name}</span>
                          <Badge
                            variant="outline"
                            className={
                              permission.granted
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {permission.granted ? "Granted" : "Denied"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bio Section */}
            {user.bio && (
              <>
                <Separator />
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* AI Knowledge Insights tab */}
         { loading ? <div>Loading...</div> :<TabsContent value="knowledge" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Overall Knowledge Score */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <CardTitle>AI-Generated Knowledge Profile</CardTitle>
                  </div>
                  <CardDescription>
                    {AIdetail?.knowledgeDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{knowledgeInsights.overallScore}</div>
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                    </div> */}
                    {/* <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="bg-primary h-3 rounded-full transition-all duration-500"
                          style={{ width: `${knowledgeInsights.overallScore * 10}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Exceptional performer with strong leadership and analytical capabilities
                      </p>
                    </div> */}
                  {/* </div> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <CardTitle>Growth Opportunities</CardTitle>
                  </div>
                  <CardDescription>Areas for continued development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {AIdetail?.growthOpportunities.map((opportunities, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p className="text-sm">{opportunities}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* interestAreas */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <CardTitle>Interest Areas</CardTitle>
                  </div>
                  <CardDescription>AI-suggested areas of interest</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {AIdetail?.interestAreas.map((contribution, index) => (
                      <div key={index} className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm font-medium text-blue-900">{contribution}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Learning Path */}
              {/* <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <CardTitle>Recommended Learning Path</CardTitle>
                  </div>
                  <CardDescription>AI-suggested development areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {knowledgeInsights.learningPath.map((path, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded border">
                        <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{path}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </TabsContent>}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
