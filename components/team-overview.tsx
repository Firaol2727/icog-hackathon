"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, UserPlus, Shield, Activity } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export function TeamOverview() {
  const [statistics,setStatistics]=useState({
    totalActiveUsers:0,
    totalAdmin:0,
    totalMembers:0
  })
  const [departmentStat,setDepartmentStat]=useState<{
    department : string|null,
    count : number
  }[]>([])
  useEffect(()=>{
    fetch('api/user/statistics',{
      method:'GET'
    }).then(async res=>{
      const data= await res.json()
      console.log('data of api',data)
      setStatistics(data);
      setDepartmentStat(data.usersByDepartment)
    })
    .catch((err)=>{
      toast.error(err.message);
    })
  },[])
  const teamStats = [
    { title: "Total Members",name:'totalMembers', icon: Users, color: "text-blue-600" },
    { title: "Active Users",name:'totalActiveUsers', icon: Activity, color: "text-green-600" },
    { title: "Administrators",name:'totalAdmin',  icon: Shield, color: "text-purple-600" },
    { title: "Pending Invites",name:'totalAdmin',  icon: UserPlus, color: "text-orange-600" },
  ]

  const recentActivity = [
    {
      user: "Sarah Chen",
      action: "Created proposal",
      target: "Q1 Marketing Campaign",
      time: "2 hours ago",
      avatar: "/professional-avatar.png",
      initials: "SC",
    },
    {
      user: "Mike Johnson",
      action: "Approved proposal",
      target: "Partnership Agreement",
      time: "4 hours ago",
      avatar: "/professional-avatar.png",
      initials: "MJ",
    },
    {
      user: "Lisa Wang",
      action: "Shared knowledge",
      target: "Data Analytics Best Practices",
      time: "6 hours ago",
      avatar: "/professional-avatar.png",
      initials: "LW",
    },
    {
      user: "Alex Rodriguez",
      action: "Updated profile",
      target: "Contact information",
      time: "1 day ago",
      avatar: "/professional-avatar.png",
      initials: "AR",
    },
  ]

  const departmentBreakdown = [
    { name: "Product", count: 12 },
    { name: "Marketing", count: 8 },
    { name: "Finance", count: 6, percentage: 18 },
    { name: "Operations", count: 5, percentage: 15 },
    { name: "HR", count: 3, percentage: 8 },
  ]

  return (
    <div className="grid gap-6">
      {/* Team Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {teamStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics[stat.name as keyof typeof statistics]}</div>
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
            <CardDescription>Latest team member actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                    <AvatarFallback className="text-xs">{activity.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
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

        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Department Breakdown</CardTitle>
            <CardDescription>Team distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStat.map((dept) => (
                <div key={dept.department} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept.department}</span>
                    <span className="text-sm text-muted-foreground">
                      {dept.count} members ({Math.round(dept.count/statistics.totalMembers*100)}%)
                    </span>
                  </div>
                  <Progress value={Math.round(dept.count/statistics.totalMembers*100)} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
