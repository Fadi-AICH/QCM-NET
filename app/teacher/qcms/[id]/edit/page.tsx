"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import { getQCMById, type Question } from "@/lib/mock-data"

export default function EditQCMPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const originalQcm = getQCMById(Number.parseInt(params.id))

  const [title, setTitle] = useState(originalQcm?.title || "")
  const [description, setDescription] = useState(originalQcm?.description || "")
  const [duration, setDuration] = useState(originalQcm?.duration || 30)
  const [questions, setQuestions] = useState<Question[]>(originalQcm?.questions || [])

  if (!originalQcm) {
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

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.max(...questions.map((q) => q.id), 0) + 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setQuestions(updatedQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setQuestions(updatedQuestions)
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    // TODO: Save to backend
    console.log("Saving QCM:", { title, description, duration, questions })
    router.push(`/teacher/qcms/${params.id}`)
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
            <h1 className="text-2xl font-bold">Edit QCM</h1>
            <p className="text-muted-foreground">Modify QCM details and questions</p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>QCM title, description, and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter QCM title" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter QCM description"
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number.parseInt(e.target.value))}
              min="1"
              max="180"
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Questions ({questions.length})</CardTitle>
              <CardDescription>Add and edit questions for this QCM</CardDescription>
            </div>
            <Button onClick={addQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, questionIndex) => (
            <div key={question.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Question {questionIndex + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>Question Text</Label>
                <Textarea
                  value={question.question}
                  onChange={(e) => updateQuestion(questionIndex, "question", e.target.value)}
                  placeholder="Enter your question"
                />
              </div>

              <div>
                <Label>Answer Options</Label>
                <div className="space-y-2">
                  <RadioGroup
                    value={question.correctAnswer.toString()}
                    onValueChange={(value) => updateQuestion(questionIndex, "correctAnswer", Number.parseInt(value))}
                  >
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={optionIndex.toString()} />
                        <Input
                          value={option}
                          onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Select the radio button next to the correct answer</p>
              </div>

              <div>
                <Label>Explanation (Optional)</Label>
                <Textarea
                  value={question.explanation || ""}
                  onChange={(e) => updateQuestion(questionIndex, "explanation", e.target.value)}
                  placeholder="Explain why this is the correct answer"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
