"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Crown, Shield, User, FileText, BookOpen, BarChart3, Users, Settings } from "lucide-react"

export function RolePermissions() {
  const roles = [
    {
      name: "Administrator",
      description: "Full system access and user management",
      icon: Crown,
      color: "text-yellow-600",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
      userCount: 3,
    },
    {
      name: "Manager",
      description: "Department management and proposal oversight",
      icon: Shield,
      color: "text-blue-600",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      userCount: 8,
    },
    {
      name: "User",
      description: "Standard access to proposals and knowledge sharing",
      icon: User,
      color: "text-gray-600",
      badgeColor: "bg-gray-100 text-gray-800 border-gray-200",
      userCount: 23,
    },
  ]

  const permissions = [
    {
      category: "Proposals",
      icon: FileText,
      items: [
        { name: "Create Proposals", admin: true, manager: true, user: true },
        { name: "Edit Own Proposals", admin: true, manager: true, user: true },
        { name: "Edit All Proposals", admin: true, manager: true, user: false },
        { name: "Delete Proposals", admin: true, manager: false, user: false },
        { name: "Approve Proposals", admin: true, manager: true, user: false },
        { name: "View All Proposals", admin: true, manager: true, user: false },
      ],
    },
    {
      category: "Knowledge Hub",
      icon: BookOpen,
      items: [
        { name: "Create Posts", admin: true, manager: true, user: true },
        { name: "Edit Own Posts", admin: true, manager: true, user: true },
        { name: "Edit All Posts", admin: true, manager: true, user: false },
        { name: "Delete Posts", admin: true, manager: false, user: false },
        { name: "Moderate Comments", admin: true, manager: true, user: false },
      ],
    },
    {
      category: "Analytics",
      icon: BarChart3,
      items: [
        { name: "View Own Analytics", admin: true, manager: true, user: true },
        { name: "View Team Analytics", admin: true, manager: true, user: false },
        { name: "View All Analytics", admin: true, manager: false, user: false },
        { name: "Export Reports", admin: true, manager: true, user: false },
      ],
    },
    {
      category: "User Management",
      icon: Users,
      items: [
        { name: "View Team Members", admin: true, manager: true, user: false },
        { name: "Invite Users", admin: true, manager: false, user: false },
        { name: "Edit User Roles", admin: true, manager: false, user: false },
        { name: "Deactivate Users", admin: true, manager: false, user: false },
      ],
    },
    {
      category: "System Settings",
      icon: Settings,
      items: [
        { name: "Manage Integrations", admin: true, manager: false, user: false },
        { name: "System Configuration", admin: true, manager: false, user: false },
        { name: "Audit Logs", admin: true, manager: false, user: false },
        { name: "Backup & Restore", admin: true, manager: false, user: false },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Role Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <Card key={role.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className={`h-6 w-6 ${role.color}`} />
                  <Badge className={role.badgeColor} variant="outline">
                    {role.userCount} users
                  </Badge>
                </div>
                <CardTitle className="text-lg">{role.name}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions Matrix</CardTitle>
          <CardDescription>Configure what each role can access and modify</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {permissions.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.category} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 font-medium text-sm">
                      <div>Permission</div>
                      <div className="text-center">Administrator</div>
                      <div className="text-center">Manager</div>
                      <div className="text-center">User</div>
                    </div>

                    {category.items.map((item, index) => (
                      <div
                        key={item.name}
                        className={`grid grid-cols-4 gap-4 p-4 items-center ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <div className="text-sm">{item.name}</div>
                        <div className="flex justify-center">
                          <Switch checked={item.admin} disabled />
                        </div>
                        <div className="flex justify-center">
                          <Switch checked={item.manager} />
                        </div>
                        <div className="flex justify-center">
                          <Switch checked={item.user} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-end mt-6">
            <Button>Save Permission Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
