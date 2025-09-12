"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Users, BarChart3, Clock } from "lucide-react"
import { getQCMById } from "@/lib/mock-data"

export default function QCMDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const qcm = getQCMById(Number.parseInt(params.id))

  if (!qcm) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">QCM not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{qcm.title}</h1>
            <p className="text-muted-foreground">{qcm.description}</p>
          </div>
        </div>
        <Button onClick={() => router.push(`/teacher/qcms/${qcm.id}/edit`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit QCM
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{qcm.duration}</p>
                <p className="text-xs text-muted-foreground">Minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{qcm.attempts}</p>
                <p className="text-xs text-muted-foreground">Attempts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{qcm.avgScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Badge variant={qcm.status === "active" ? "default" : qcm.status === "draft" ? "secondary" : "outline"}>
                {qcm.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Questions ({qcm.questions.length})</CardTitle>
          <CardDescription>All questions in this QCM</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {qcm.questions.map((question, index) => (
            <div key={question.id} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">
                Question {index + 1}: {question.question}
              </h3>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-2 rounded border ${
                      optionIndex === question.correctAnswer
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-gray-50"
                    }`}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                    {option}
                    {optionIndex === question.correctAnswer && (
                      <Badge variant="secondary" className="ml-2">
                        Correct
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              {question.explanation && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
