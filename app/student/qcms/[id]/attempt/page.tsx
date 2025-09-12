"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { getQCMById } from "@/lib/mock-data"

export default function AttemptQCMPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const qcmData = getQCMById(Number.parseInt(params.id))

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState((qcmData?.duration || 30) * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const qcmNotFound = !qcmData

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    })
  }

  const handleSubmit = () => {
    let correctAnswers = 0
    qcmData?.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / qcmData?.questions.length) * 100)

    // Store results in localStorage for the results page
    const results = {
      qcmId: qcmData?.id,
      qcmTitle: qcmData?.title,
      score,
      correctAnswers,
      totalQuestions: qcmData?.questions.length,
      answers,
      submittedAt: new Date().toISOString(),
    }

    localStorage.setItem(`qcm_result_${qcmData?.id}`, JSON.stringify(results))

    console.log("[v0] Submitting answers:", answers, "Score:", score)
    router.push(`/student/results/${params.id}`)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const progress = ((currentQuestion + 1) / (qcmData?.questions.length || 1)) * 100

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-4 lg:space-y-6">
      {qcmNotFound ? (
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">QCM not found</p>
                <Button onClick={() => router.push("/student/qcms")} variant="outline">
                  Back to QCMs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">{qcmData.title}</h1>
              <p className="text-muted-foreground text-sm lg:text-base">{qcmData.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={timeLeft < 300 ? "text-destructive font-medium" : ""}>{formatTime(timeLeft)}</span>
              </div>
              <Button onClick={handleSubmit} variant="outline" size="sm">
                Submit QCM
              </Button>
            </div>
          </div>

          {/* Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {qcmData.questions.length}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Question {currentQuestion + 1}</CardTitle>
              <CardDescription className="text-sm lg:text-base">
                {qcmData.questions[currentQuestion].question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[qcmData.questions[currentQuestion].id]?.toString() || ""}
                onValueChange={(value) =>
                  handleAnswerChange(qcmData.questions[currentQuestion].id, Number.parseInt(value))
                }
              >
                {qcmData.questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm lg:text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="w-full lg:w-auto"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center justify-center space-x-1 lg:space-x-2 overflow-x-auto pb-2 lg:pb-0">
              {qcmData.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentQuestion ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 p-0 flex-shrink-0 ${
                    answers[qcmData.questions[index].id] !== undefined ? "bg-secondary/20 border-secondary" : ""
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {currentQuestion === qcmData.questions.length - 1 ? (
              <Button onClick={handleSubmit} className="w-full lg:w-auto">
                Submit QCM
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(Math.min(qcmData.questions.length - 1, currentQuestion + 1))}
                className="w-full lg:w-auto"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
