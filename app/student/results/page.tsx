"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, CheckCircle, XCircle, Eye, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for completed QCMs
const completedQCMs = [
  {
    id: 1,
    title: "Network Protocols Fundamentals",
    completedAt: "2024-01-15",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeSpent: "12 minutes",
    difficulty: "Medium",
    feedback: "Excellent understanding of TCP/IP protocols. Focus on improving knowledge of routing algorithms.",
    category: "Protocols",
  },
  {
    id: 2,
    title: "OSI Model Deep Dive",
    completedAt: "2024-01-12",
    score: 92,
    totalQuestions: 15,
    correctAnswers: 14,
    timeSpent: "8 minutes",
    difficulty: "Hard",
    feedback:
      "Outstanding performance! Your grasp of the OSI layers is impressive. Minor improvement needed in Physical layer concepts.",
    category: "Architecture",
  },
  {
    id: 3,
    title: "Subnetting Basics",
    completedAt: "2024-01-10",
    score: 78,
    totalQuestions: 25,
    correctAnswers: 19,
    timeSpent: "18 minutes",
    difficulty: "Easy",
    feedback: "Good foundation in subnetting. Practice more complex VLSM scenarios to improve your skills.",
    category: "IP Addressing",
  },
  {
    id: 4,
    title: "Network Security Essentials",
    completedAt: "2024-01-08",
    score: 88,
    totalQuestions: 18,
    correctAnswers: 16,
    timeSpent: "15 minutes",
    difficulty: "Medium",
    feedback: "Strong security knowledge. Consider reviewing encryption protocols and firewall configurations.",
    category: "Security",
  },
]

function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600"
  if (score >= 80) return "text-blue-600"
  if (score >= 70) return "text-yellow-600"
  return "text-red-600"
}

function getScoreBadgeVariant(score: number) {
  if (score >= 90) return "default"
  if (score >= 80) return "secondary"
  if (score >= 70) return "outline"
  return "destructive"
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "text-green-600"
    case "Medium":
      return "text-yellow-600"
    case "Hard":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export default function MyResultsPage() {
  const averageScore = Math.round(completedQCMs.reduce((sum, qcm) => sum + qcm.score, 0) / completedQCMs.length)
  const totalQCMs = completedQCMs.length
  const totalQuestions = completedQCMs.reduce((sum, qcm) => sum + qcm.totalQuestions, 0)
  const totalCorrect = completedQCMs.reduce((sum, qcm) => sum + qcm.correctAnswers, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Results</h1>
        <p className="text-muted-foreground">Track your QCM performance and progress</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalQCMs}</p>
                <p className="text-sm text-muted-foreground">Completed QCMs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">
                  {totalCorrect}/{totalQuestions}
                </p>
                <p className="text-sm text-muted-foreground">Correct Answers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{Math.round((totalCorrect / totalQuestions) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Overall Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Results</h2>

        {completedQCMs.map((qcm) => (
          <Card key={qcm.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{qcm.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(qcm.completedAt).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{qcm.timeSpent}</span>
                    </span>
                    <Badge variant="outline">{qcm.category}</Badge>
                  </CardDescription>
                </div>
                <div className="text-right space-y-2">
                  <div className={`text-2xl font-bold ${getScoreColor(qcm.score)}`}>{qcm.score}%</div>
                  <Badge variant={getScoreBadgeVariant(qcm.score)}>
                    {qcm.correctAnswers}/{qcm.totalQuestions}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {qcm.correctAnswers}/{qcm.totalQuestions} correct
                  </span>
                </div>
                <Progress value={(qcm.correctAnswers / qcm.totalQuestions) * 100} className="h-2" />
              </div>

              {/* Difficulty and Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className={`text-sm font-medium ${getDifficultyColor(qcm.difficulty)}`}>{qcm.difficulty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{qcm.correctAnswers} correct</span>
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">{qcm.totalQuestions - qcm.correctAnswers} incorrect</span>
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Personalized Feedback</h4>
                <p className="text-sm text-muted-foreground">{qcm.feedback}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/student/results/${qcm.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/student/qcms/${qcm.id}/attempt`}>Retake QCM</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
