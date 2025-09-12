"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, LayoutDashboard, FileText, BarChart3, Settings, LogOut, Plus, Menu } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  {
    name: "My QCMs",
    href: "/teacher/qcms",
    icon: FileText,
  },
  {
    name: "Statistics",
    href: "/teacher/statistics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/teacher/settings",
    icon: Settings,
  },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    sessionStorage.clear()

    if (onNavigate) onNavigate()

    router.push("/login")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/teacher" className="flex items-center space-x-2" onClick={onNavigate}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">QCM-Net</span>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">Teacher Portal</p>
      </div>

      {/* Quick Action */}
      <div className="p-4 border-b border-border">
        <Link href="/teacher/qcms/create" onClick={onNavigate}>
          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Create QCM
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Actions */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export function TeacherSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="hidden lg:flex w-64 bg-card border-r border-border">
        <SidebarContent />
      </div>

      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="fixed top-4 left-4 z-50 lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
