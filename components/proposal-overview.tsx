import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

export function ProposalOverview() {
  const proposals = [
    {
      id: 1,
      title: "Q1 Marketing Campaign",
      status: "in-review",
      progress: 75,
      dueDate: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      title: "Product Launch Strategy",
      status: "draft",
      progress: 45,
      dueDate: "2024-01-20",
      priority: "medium",
    },
    {
      id: 3,
      title: "Partnership Agreement",
      status: "approved",
      progress: 100,
      dueDate: "2024-01-10",
      priority: "low",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-review":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "draft":
        return <FileText className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "in-review":
        return "bg-amber-100 text-amber-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Contents
        </CardTitle>
        <CardDescription>A list of recent contents </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(proposal.status)}
                  <h4 className="font-medium">{proposal.title}</h4>
                  <Badge className={getStatusColor(proposal.status)}>{proposal.status.replace("-", " ")}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Due: {proposal.dueDate}</span>
                  {/* <span>Priority: {proposal.priority}</span> */}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Overall Score </span>
                    <span>{proposal.progress}%</span>
                  </div>
                  <Progress value={proposal.progress} className="h-2" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-4 bg-transparent">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
