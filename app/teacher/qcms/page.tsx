import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { QCMTable } from "@/components/teacher/qcm-table"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export default function QCMsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My QCMs</h1>
          <p className="text-muted-foreground">Manage your quizzes and track their performance</p>
        </div>
        <Link href="/teacher/qcms/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New QCM
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find specific QCMs quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search QCMs by title..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* QCM Table */}
      <QCMTable />
    </div>
  )
}
