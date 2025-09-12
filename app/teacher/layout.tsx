import type React from "react"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto lg:ml-0 pt-16 lg:pt-0">{children}</main>
    </div>
  )
}
