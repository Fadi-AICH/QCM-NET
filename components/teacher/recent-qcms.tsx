"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, MoreHorizontal, Trash2, Copy, PauseCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const recentQCMs = [
  {
    id: 1,
    title: "TCP/IP Protocol Fundamentals",
    questions: 15,
    attempts: 42,
    avgScore: 78,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Network Security Basics",
    questions: 20,
    attempts: 38,
    avgScore: 82,
    status: "active",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    title: "OSI Model Layers",
    questions: 12,
    attempts: 55,
    avgScore: 75,
    status: "draft",
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    title: "Routing Protocols",
    questions: 18,
    attempts: 29,
    avgScore: 71,
    status: "active",
    createdAt: "2024-01-08",
  },
]

export function RecentQCMs() {
  const [qcms, setQcms] = useState(recentQCMs)

  const handleDelete = (id: number) => {
    setQcms(qcms.filter((qcm) => qcm.id !== id))
    console.log(`[v0] Deleted QCM with id: ${id}`)
  }

  const handleDuplicate = (id: number) => {
    const qcmToDuplicate = qcms.find((qcm) => qcm.id === id)
    if (qcmToDuplicate) {
      const newQcm = {
        ...qcmToDuplicate,
        id: Math.max(...qcms.map((q) => q.id)) + 1,
        title: `${qcmToDuplicate.title} (Copy)`,
        attempts: 0,
        status: "draft" as const,
      }
      setQcms([...qcms, newQcm])
      console.log(`[v0] Duplicated QCM with id: ${id}`)
    }
  }

  const handleDeactivate = (id: number) => {
    setQcms(qcms.map((qcm) => (qcm.id === id ? { ...qcm, status: qcm.status === "active" ? "draft" : "active" } : qcm)))
    console.log(`[v0] Toggled status for QCM with id: ${id}`)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent QCMs</CardTitle>
          <CardDescription>Your latest created quizzes and their performance</CardDescription>
        </div>
        <Link href="/teacher/qcms">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {qcms.map((qcm) => (
            <div key={qcm.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium">{qcm.title}</h4>
                  <Badge variant={qcm.status === "active" ? "default" : "secondary"}>{qcm.status}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{qcm.questions} questions</span>
                  <span>{qcm.attempts} attempts</span>
                  <span>{qcm.avgScore}% avg score</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/teacher/qcms/${qcm.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={`/teacher/qcms/${qcm.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDuplicate(qcm.id)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate QCM
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeactivate(qcm.id)}>
                      <PauseCircle className="w-4 h-4 mr-2" />
                      {qcm.status === "active" ? "Deactivate" : "Activate"} QCM
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(qcm.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete QCM
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
