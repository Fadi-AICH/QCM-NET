import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, FileText, Play, Search, Trophy } from "lucide-react"
import Link from "next/link"

const allQCMs = [
  {
    id: 1,
    title: "TCP/IP Protocol Fundamentals",
    description: "Basic concepts of TCP/IP networking protocols",
    questions: 15,
    duration: 20,
    difficulty: "Easy",
    status: "completed",
    score: 85,
  },
  {
    id: 2,
    title: "Network Security Basics",
    description: "Introduction to network security principles",
    questions: 20,
    duration: 30,
    difficulty: "Medium",
    status: "completed",
    score: 78,
  },
  {
    id: 3,
    title: "OSI Model Layers",
    description: "Understanding the seven layers of the OSI model",
    questions: 12,
    duration: 15,
    difficulty: "Easy",
    status: "completed",
    score: 92,
  },
  {
    id: 4,
    title: "Network Security Advanced",
    description: "Advanced concepts in network security and encryption",
    questions: 20,
    duration: 30,
    difficulty: "Hard",
    status: "available",
  },
  {
    id: 5,
    title: "IPv6 Implementation",
    description: "Understanding and implementing IPv6 protocols",
    questions: 15,
    duration: 25,
    difficulty: "Medium",
    status: "available",
  },
]

export default function StudentQCMsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Available QCMs</h1>
        <p className="text-muted-foreground">Browse and attempt computer network quizzes</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Find QCMs</CardTitle>
          <CardDescription>Search for specific topics or difficulty levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search QCMs by title or topic..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* QCMs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allQCMs.map((qcm) => (
          <Card key={qcm.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{qcm.title}</CardTitle>
                  <CardDescription className="mt-1">{qcm.description}</CardDescription>
                </div>
                <Badge
                  variant={
                    qcm.status === "completed" ? "default" : qcm.status === "available" ? "secondary" : "outline"
                  }
                >
                  {qcm.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <FileText className="w-3 h-3 mr-1" />
                    {qcm.questions} questions
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {qcm.duration} min
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Difficulty: {qcm.difficulty}</span>
                  {qcm.status === "completed" && qcm.score && (
                    <span className="flex items-center text-sm font-medium text-primary">
                      <Trophy className="w-3 h-3 mr-1" />
                      {qcm.score}%
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                {qcm.status === "available" ? (
                  <Link href={`/student/qcms/${qcm.id}/attempt`}>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start QCM
                    </Button>
                  </Link>
                ) : (
                  <div className="flex space-x-2">
                    <Link href={`/student/results/${qcm.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        View Results
                      </Button>
                    </Link>
                    <Link href={`/student/qcms/${qcm.id}/attempt`} className="flex-1">
                      <Button className="w-full">Retake</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
