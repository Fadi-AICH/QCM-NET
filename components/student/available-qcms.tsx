import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Play } from "lucide-react"
import Link from "next/link"

const availableQCMs = [
  {
    id: 1,
    title: "Network Security Advanced",
    description: "Advanced concepts in network security and encryption",
    questions: 20,
    duration: 30,
    difficulty: "Hard",
    status: "new",
  },
  {
    id: 2,
    title: "IPv6 Implementation",
    description: "Understanding and implementing IPv6 protocols",
    questions: 15,
    duration: 25,
    difficulty: "Medium",
    status: "new",
  },
  {
    id: 3,
    title: "Network Troubleshooting",
    description: "Common network issues and troubleshooting techniques",
    questions: 18,
    duration: 35,
    difficulty: "Medium",
    status: "recommended",
  },
]

export function AvailableQCMs() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Available QCMs</CardTitle>
          <CardDescription>New quizzes ready for you to attempt</CardDescription>
        </div>
        <Link href="/student/qcms">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {availableQCMs.map((qcm) => (
            <div key={qcm.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium">{qcm.title}</h4>
                  <Badge variant={qcm.status === "recommended" ? "default" : "secondary"}>{qcm.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{qcm.description}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <FileText className="w-3 h-3 mr-1" />
                    {qcm.questions} questions
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {qcm.duration} min
                  </span>
                  <span>{qcm.difficulty}</span>
                </div>
              </div>
              <Link href={`/student/qcms/${qcm.id}/attempt`}>
                <Button>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
