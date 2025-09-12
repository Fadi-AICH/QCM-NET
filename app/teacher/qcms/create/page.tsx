"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Trash2, Save } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export default function CreateQCMPage() {
  console.log("[v0] CreateQCMPage component is rendering")

  const [qcmTitle, setQcmTitle] = useState("")
  const [qcmDescription, setQcmDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    },
  ])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)),
            }
          : q,
      ),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement QCM creation logic
    console.log("Creating QCM:", { qcmTitle, qcmDescription, questions })
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div style={{ display: "none" }}>DEBUG: CreateQCMPage loaded</div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Create New QCM</h1>
          <p className="text-muted-foreground">Design your quiz with multiple choice questions</p>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
          <Button variant="outline" className="w-full lg:w-auto bg-transparent">
            Save as Draft
          </Button>
          <Button onClick={handleSubmit} className="w-full lg:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Publish QCM
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
        {/* QCM Details */}
        <Card>
          <CardHeader>
            <CardTitle>QCM Information</CardTitle>
            <CardDescription>Basic details about your quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">QCM Title</Label>
              <Input
                id="title"
                placeholder="Enter QCM title..."
                value={qcmTitle}
                onChange={(e) => setQcmTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this QCM covers..."
                value={qcmDescription}
                onChange={(e) => setQcmDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((question, questionIndex) => (
            <Card key={question.id}>
              <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
                <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                {questions.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Textarea
                    placeholder="Enter your question..."
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Answer Options</Label>
                  <RadioGroup
                    value={question.correctAnswer.toString()}
                    onValueChange={(value) => updateQuestion(question.id, "correctAnswer", Number.parseInt(value))}
                  >
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-3">
                        <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-option-${optionIndex}`} />
                        <Input
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </RadioGroup>
                  <p className="text-sm text-muted-foreground">Select the radio button next to the correct answer</p>
                </div>

                <div className="space-y-2">
                  <Label>Explanation (Optional)</Label>
                  <Textarea
                    placeholder="Explain why this is the correct answer..."
                    value={question.explanation}
                    onChange={(e) => updateQuestion(question.id, "explanation", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="outline" onClick={addQuestion} className="w-full bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            Add Another Question
          </Button>
        </div>
      </form>
    </div>
  )
}
