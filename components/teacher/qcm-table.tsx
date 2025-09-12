"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, MoreHorizontal, Trash2, Copy, Archive } from "lucide-react"
import { mockQCMs } from "@/lib/mock-data"

export function QCMTable() {
  const router = useRouter()
  const [qcms, setQcms] = useState(mockQCMs)

  const handleView = (id: number) => {
    router.push(`/teacher/qcms/${id}`)
  }

  const handleEdit = (id: number) => {
    router.push(`/teacher/qcms/${id}/edit`)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this QCM?")) {
      setQcms(qcms.filter((qcm) => qcm.id !== id))
    }
  }

  const handleDuplicate = (id: number) => {
    const qcmToDuplicate = qcms.find((qcm) => qcm.id === id)
    if (qcmToDuplicate) {
      const newQcm = {
        ...qcmToDuplicate,
        id: Math.max(...qcms.map((q) => q.id)) + 1,
        title: `${qcmToDuplicate.title} (Copy)`,
        attempts: 0,
        avgScore: 0,
        status: "draft" as const,
        createdAt: new Date().toISOString().split("T")[0],
        lastModified: new Date().toISOString().split("T")[0],
      }
      setQcms([...qcms, newQcm])
    }
  }

  const handleDeactivate = (id: number) => {
    setQcms(
      qcms.map((qcm) => (qcm.id === id ? { ...qcm, status: qcm.status === "active" ? "archived" : "active" } : qcm)),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All QCMs ({qcms.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Attempts</TableHead>
              <TableHead>Avg Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qcms.map((qcm) => (
              <TableRow key={qcm.id}>
                <TableCell className="font-medium">{qcm.title}</TableCell>
                <TableCell>{qcm.questions.length}</TableCell>
                <TableCell>{qcm.attempts}</TableCell>
                <TableCell>{qcm.avgScore}%</TableCell>
                <TableCell>
                  <Badge
                    variant={qcm.status === "active" ? "default" : qcm.status === "draft" ? "secondary" : "outline"}
                  >
                    {qcm.status}
                  </Badge>
                </TableCell>
                <TableCell>{qcm.lastModified}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleView(qcm.id)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(qcm.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
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
                          <Archive className="w-4 h-4 mr-2" />
                          {qcm.status === "active" ? "Deactivate" : "Activate"} QCM
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(qcm.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete QCM
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
