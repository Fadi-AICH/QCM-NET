import type React from "react"
import { StudentSidebar } from "@/components/student/student-sidebar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <StudentSidebar />
      <main className="flex-1 overflow-y-auto lg:ml-0 pt-16 lg:pt-0">{children}</main>
    </div>
  )
}
