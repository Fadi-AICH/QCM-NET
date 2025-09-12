"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const monthlyData = [
  { month: "Jan", qcms: 4, students: 45 },
  { month: "Feb", qcms: 3, students: 52 },
  { month: "Mar", qcms: 5, students: 48 },
  { month: "Apr", qcms: 2, students: 61 },
  { month: "May", qcms: 4, students: 55 },
  { month: "Jun", qcms: 6, students: 67 },
]

const performanceData = [
  { week: "Week 1", avgScore: 72 },
  { week: "Week 2", avgScore: 75 },
  { week: "Week 3", avgScore: 78 },
  { week: "Week 4", avgScore: 81 },
]

export function TeacherStats() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
          <CardDescription>QCMs created and student participation over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qcms" fill="hsl(var(--primary))" name="QCMs Created" />
              <Bar dataKey="students" fill="hsl(var(--secondary))" name="Active Students" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Performance Trend</CardTitle>
          <CardDescription>Average scores over the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Average Score (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
