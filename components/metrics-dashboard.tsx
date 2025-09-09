import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Clock, CheckCircle, BarChart3 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function MetricsDashboard() {
  const metrics = [
    {
      title: "Total Contents",
      value: "47",
      change: "+12%",
      trend: "up",
      icon: CheckCircle,
      details: "8 this week",
    },
    {
      title: "Knowledge Posts",
      value: "156",
      change: "+28%",
      trend: "up",
      icon: BarChart3,
      details: "14 this week",
    },
  ]

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>
                </div>
                <span>{metric.details}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}

      <Button variant="outline" className="w-full bg-transparent" size="sm" asChild>
        <a href="/analytics">View Detailed Analytics</a>
      </Button>
    </div>
  )
}
