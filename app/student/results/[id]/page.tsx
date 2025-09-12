import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, TrendingUp, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import Link from "next/link"

// Mock result data
const resultData = {
  qcmId: 1,
  qcmTitle: "Network Security Advanced",
  score: 85,
  totalQuestions: 20,
  correctAnswers: 17,
  timeSpent: 25,
  completedAt: "2024-01-20T14:30:00Z",
  feedback: {
    overall: "Excellent performance! You have a strong understanding of network security concepts.",
    strengths: [
      "Strong knowledge of encryption algorithms",
      "Good understanding of firewall configurations",
      "Excellent grasp of secure protocols",
    ],
    improvements: [
      "Review VPN implementation details",
      "Study advanced intrusion detection systems",
      "Practice with network security tools",
    ],
  },
  questionResults: [
    {
      id: 1,
      question: "Which encryption algorithm is considered most secure for modern network communications?",
      userAnswer: 1,
      correctAnswer: 1,
      isCorrect: true,
      explanation: "AES is indeed the current standard for secure encryption in modern networks.",
    },
    {
      id: 2,
      question: "What is the primary purpose of a firewall in network security?",
      userAnswer: 1,
      correctAnswer: 1,
      isCorrect: true,
      explanation: "Firewalls filter network traffic based on predefined security rules.",
    },
    {
      id: 3,
      question: "Which protocol provides secure communication over the internet?",
      userAnswer: 1,
      correctAnswer: 2,
      isCorrect: false,
      explanation: "HTTPS (not HTTP) provides secure communication by encrypting data transmission.",
    },
  ],
}

export default function ResultPage({ params }: { params: { id: string } }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: "default" as const, text: "Excellent" }
    if (score >= 60) return { variant: "secondary" as const, text: "Good" }
    return { variant: "destructive" as const, text: "Needs Improvement" }
  }

  const scoreBadge = getScoreBadge(resultData.score)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">QCM Results</h1>
        <p className="text-muted-foreground">{resultData.qcmTitle}</p>
      </div>

      {/* Score Overview */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className={`w-12 h-12 ${getScoreColor(resultData.score)}`} />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold">
            <span className={getScoreColor(resultData.score)}>{resultData.score}%</span>
          </CardTitle>
          <CardDescription className="flex items-center justify-center space-x-2">
            <Badge variant={scoreBadge.variant}>{scoreBadge.text}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{resultData.correctAnswers}</div>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-muted-foreground">{resultData.totalQuestions}</div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">{resultData.timeSpent}m</div>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.round((resultData.correctAnswers / resultData.totalQuestions) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Strengths</span>
            </CardTitle>
            <CardDescription>Areas where you performed well</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resultData.feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span>Areas for Improvement</span>
            </CardTitle>
            <CardDescription>Topics to focus on for better performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resultData.feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Overall Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{resultData.feedback.overall}</p>
        </CardContent>
      </Card>

      {/* Question Review */}
      <Card>
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
          <CardDescription>Review your answers and explanations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resultData.questionResults.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium flex-1">
                    Question {index + 1}: {question.question}
                  </h4>
                  {question.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-center space-x-4">
        <Link href="/student/qcms">
          <Button variant="outline">Browse More QCMs</Button>
        </Link>
        <Link href={`/student/qcms/${params.id}/attempt`}>
          <Button>
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake QCM
          </Button>
        </Link>
      </div>
    </div>
  )
}
