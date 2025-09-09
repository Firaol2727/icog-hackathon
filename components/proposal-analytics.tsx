"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
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
} from "recharts"

export function ProposalAnalytics() {
  const monthlyData = [
    { month: "Jan", submitted: 12, approved: 10, rejected: 2, avgDays: 3.5 },
    { month: "Feb", submitted: 15, approved: 13, rejected: 2, avgDays: 3.2 },
    { month: "Mar", submitted: 18, approved: 16, rejected: 2, avgDays: 2.8 },
    { month: "Apr", submitted: 14, approved: 12, rejected: 2, avgDays: 3.1 },
    { month: "May", submitted: 20, approved: 17, rejected: 3, avgDays: 2.9 },
    { month: "Jun", submitted: 16, approved: 14, rejected: 2, avgDays: 3.0 },
  ]

  const statusData = [
    { name: "Approved", value: 87, color: "#10b981" },
    { name: "In Review", value: 8, color: "#f59e0b" },
    { name: "Rejected", value: 5, color: "#ef4444" },
  ]

  const categoryData = [
    { category: "Marketing", count: 18, avgBudget: 125000, successRate: 89 },
    { category: "Product", count: 12, avgBudget: 250000, successRate: 92 },
    { category: "Partnership", count: 8, avgBudget: 75000, successRate: 75 },
    { category: "Research", count: 9, avgBudget: 180000, successRate: 85 },
  ]

  const reviewTimeData = [
    { reviewer: "Mike Johnson", avgDays: 2.1, proposals: 15 },
    { reviewer: "Sarah Chen", avgDays: 2.8, proposals: 12 },
    { reviewer: "David Kim", avgDays: 3.2, proposals: 18 },
    { reviewer: "Lisa Wang", avgDays: 2.5, proposals: 10 },
  ]

  return (
    <div className="grid gap-6">
      {/* Monthly Trends */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Proposal Trends</CardTitle>
            <CardDescription>Submission and approval patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="submitted" fill="#3b82f6" name="Submitted" />
                <Bar dataKey="approved" fill="#10b981" name="Approved" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Review Time</CardTitle>
            <CardDescription>Days to complete proposal review</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgDays" stroke="#f59e0b" strokeWidth={3} name="Avg Days" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution and Category Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Proposal Status Distribution</CardTitle>
            <CardDescription>Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Success rates by proposal category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{category.category}</span>
                      <span className="text-sm text-muted-foreground ml-2">({category.count} proposals)</span>
                    </div>
                    <Badge variant="outline">{category.successRate}% success</Badge>
                  </div>
                  <Progress value={category.successRate} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Avg Budget: ${category.avgBudget.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviewer Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Reviewer Performance</CardTitle>
          <CardDescription>Average review time by reviewer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewTimeData.map((reviewer) => (
              <div key={reviewer.reviewer} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{reviewer.reviewer}</p>
                  <p className="text-sm text-muted-foreground">{reviewer.proposals} proposals reviewed</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{reviewer.avgDays} days</p>
                  <p className="text-sm text-muted-foreground">avg review time</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
