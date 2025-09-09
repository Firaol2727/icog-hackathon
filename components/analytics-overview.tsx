"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, FileText, BookOpen, Users, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export function AnalyticsOverview() {
  const kpis = [
    {
      title: "Total Contents",
      value: "47",
      change: "+12%",
      trend: "up",
      period: "vs last month",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Knowledge Posts",
      value: "156",
      change: "+28%",
      trend: "up",
      period: "vs last month",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Active Users",
      value: "34",
      change: "+8%",
      trend: "up",
      period: "vs last month",
      icon: Users,
      color: "text-cyan-600",
    },
    {
      title: "Satisfactory Contents",
      value: "3",
      change: "-2",
      trend: "down",
      period: "vs last month",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        const isPositive = kpi.trend === "up"
        const changeColor = isPositive ? "text-green-600" : "text-red-600"

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <Icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {isPositive ? (
                  <TrendingUp className={`h-3 w-3 mr-1 ${changeColor}`} />
                ) : (
                  <TrendingDown className={`h-3 w-3 mr-1 ${changeColor}`} />
                )}
                <span className={changeColor}>{kpi.change}</span>
                <span className="ml-1">{kpi.period}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
