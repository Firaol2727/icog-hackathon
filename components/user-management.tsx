"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InviteUserModal } from "@/components/invite-user-modal"
import { EditUserModal } from "@/components/edit-user-modal"
import { Search, UserPlus, MoreHorizontal, Shield, User, Crown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUsers } from "@/lib/hooks/useUsers"
import { User as  TeamMember} from "@/lib/hooks/useUsers"
// interface TeamMember =User

export function UserManagement() {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  // const teamMembers: TeamMember[] = [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     email: "john.doe@company.com",
  //     role: "admin",
  //     department: "IT",
  //     status: "active",
  //     lastActive: "2 hours ago",
  //     avatar: "/professional-avatar.png",
  //     initials: "JD",
  //   },
  //   {
  //     id: "2",
  //     name: "Sarah Chen",
  //     email: "sarah.chen@company.com",
  //     role: "manager",
  //     department: "Product",
  //     status: "active",
  //     lastActive: "1 hour ago",
  //     avatar: "/professional-avatar.png",
  //     initials: "SC",
  //   },
  //   {
  //     id: "3",
  //     name: "Mike Johnson",
  //     email: "mike.johnson@company.com",
  //     role: "manager",
  //     department: "Marketing",
  //     status: "active",
  //     lastActive: "30 minutes ago",
  //     avatar: "/professional-avatar.png",
  //     initials: "MJ",
  //   },
  //   {
  //     id: "4",
  //     name: "Lisa Wang",
  //     email: "lisa.wang@company.com",
  //     role: "user",
  //     department: "Analytics",
  //     status: "active",
  //     lastActive: "3 hours ago",
  //     avatar: "/professional-avatar.png",
  //     initials: "LW",
  //   },
  //   {
  //     id: "5",
  //     name: "Alex Rodriguez",
  //     email: "alex.rodriguez@company.com",
  //     role: "user",
  //     department: "Finance",
  //     status: "inactive",
  //     lastActive: "2 days ago",
  //     avatar: "/professional-avatar.png",
  //     initials: "AR",
  //   },
  //   {
  //     id: "6",
  //     name: "Emma Thompson",
  //     email: "emma.thompson@company.com",
  //     role: "user",
  //     department: "Operations",
  //     status: "pending",
  //     lastActive: "Never",
  //     avatar: "/professional-avatar.png",
  //     initials: "ET",
  //   },
  // ]
  const users = useUsers({page:1,limit:10,search:searchQuery,role:roleFilter});

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-600" />
      case "manager":
        return <Shield className="h-4 w-4 text-blue-600" />
      case "user":
        return <User className="h-4 w-4 text-gray-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
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


  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <Button onClick={() => setShowInviteModal(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User List */}
          {users && <div className="space-y-4">
            {users.users.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.name}</p>
                      {getRoleIcon(member.role)}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.department} • Last active: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={getRoleColor(member.role)} variant="outline">
                    {member.role}
                  </Badge>
                  <Badge className={getStatusColor('active')} variant="outline">
                    {'active'}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedUser(member)}>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        {'active' === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>}
        </CardContent>
      </Card>


      {showInviteModal && <InviteUserModal onClose={() => setShowInviteModal(false)} />}

      {selectedUser && <EditUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  )
}
