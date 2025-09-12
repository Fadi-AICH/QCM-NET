"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Users, TrendingUp, Target, BookOpen, Award, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

// Mock data for charts
const studentPerformanceData = [
  { name: "Network Protocols", avgScore: 85, attempts: 45, difficulty: "Medium" },
  { name: "OSI Model", avgScore: 92, attempts: 38, difficulty: "Hard" },
  { name: "Subnetting", avgScore: 78, attempts: 52, difficulty: "Easy" },
  { name: "Network Security", avgScore: 88, attempts: 41, difficulty: "Medium" },
  { name: "Routing Algorithms", avgScore: 74, attempts: 29, difficulty: "Hard" },
  { name: "TCP/IP Stack", avgScore: 81, attempts: 47, difficulty: "Medium" },
]

const monthlyProgressData = [
  { month: "Sep", completions: 120, avgScore: 78 },
  { month: "Oct", completions: 145, avgScore: 82 },
  { month: "Nov", completions: 168, avgScore: 85 },
  { month: "Dec", completions: 134, avgScore: 87 },
  { month: "Jan", completions: 189, avgScore: 84 },
  { month: "Feb", completions: 201, avgScore: 86 },
]

const difficultyDistribution = [
  { name: "Easy", value: 35, color: "#10B981" },
  { name: "Medium", value: 45, color: "#F59E0B" },
  { name: "Hard", value: 20, color: "#EF4444" },
]

const topPerformers = [
  { name: "Sarah Johnson", score: 94, qcms: 12, rank: 1 },
  { name: "Ahmed El Mansouri", score: 91, qcms: 15, rank: 2 },
  { name: "Maria Garcia", score: 89, qcms: 11, rank: 3 },
  { name: "John Smith", score: 87, qcms: 13, rank: 4 },
  { name: "Fatima Zahra", score: 85, qcms: 10, rank: 5 },
]

const qcmDifficultyAnalysis = [
  { qcm: "Network Protocols", easy: 15, medium: 65, hard: 20 },
  { qcm: "OSI Model", easy: 10, medium: 40, hard: 50 },
  { qcm: "Subnetting", easy: 70, medium: 25, hard: 5 },
  { qcm: "Security", easy: 20, medium: 55, hard: 25 },
]

export default function TeacherStatisticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  // Calculate overview stats
  const totalStudents = 156
  const totalQCMs = 24
  const totalAttempts = 1247
  const avgClassScore = 84

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Statistics & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into student performance and QCM effectiveness</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold">{totalQCMs}</p>
                <p className="text-sm text-muted-foreground">Total QCMs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalAttempts}</p>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{avgClassScore}%</p>
                <p className="text-sm text-muted-foreground">Class Average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Performance Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>QCM Performance Overview</CardTitle>
            <CardDescription>Average scores and attempt counts by QCM</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="#0057A4" name="Avg Score %" />
                <Bar dataKey="attempts" fill="#FF6A00" name="Attempts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Progress Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress Trends</CardTitle>
            <CardDescription>QCM completions and average scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completions" stroke="#0057A4" name="Completions" />
                <Line type="monotone" dataKey="avgScore" stroke="#FF6A00" name="Avg Score %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Difficulty Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>QCM Difficulty Distribution</CardTitle>
            <CardDescription>Breakdown of QCMs by difficulty level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={difficultyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {difficultyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Students with highest average scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student) => (
                <div key={student.rank} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {student.rank}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.qcms} QCMs completed</p>
                    </div>
                  </div>
                  <Badge variant={student.rank <= 3 ? "default" : "secondary"}>{student.score}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QCM Analysis Table */}
      <Card>
        <CardHeader>
          <CardTitle>QCM Difficulty Analysis</CardTitle>
          <CardDescription>Detailed breakdown of question difficulty distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qcmDifficultyAnalysis.map((qcm, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{qcm.qcm}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600">
                      {qcm.easy}% Easy
                    </Badge>
                    <Badge variant="outline" className="text-yellow-600">
                      {qcm.medium}% Medium
                    </Badge>
                    <Badge variant="outline" className="text-red-600">
                      {qcm.hard}% Hard
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="h-2 bg-green-500 rounded-l" style={{ width: `${qcm.easy}%` }} />
                  <div className="h-2 bg-yellow-500" style={{ width: `${qcm.medium}%` }} />
                  <div className="h-2 bg-red-500 rounded-r" style={{ width: `${qcm.hard}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered analysis of your teaching effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Strong Performance</p>
                  <p className="text-sm text-green-700">
                    OSI Model QCM shows excellent student engagement with 92% average score.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Improving Trend</p>
                  <p className="text-sm text-blue-700">Class average has improved by 8% over the last 6 months.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Needs Attention</p>
                  <p className="text-sm text-yellow-700">
                    Routing Algorithms QCM has lower completion rate. Consider simplifying questions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Target className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-800">Recommendation</p>
                  <p className="text-sm text-purple-700">
                    Add more medium-difficulty questions to balance the difficulty curve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
