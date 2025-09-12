"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Clock, Globe, Save, Upload, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TeacherSettingsPage() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=120&width=120")

  // Profile settings
  const [profileSettings, setProfileSettings] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@ensit.ac.ma",
    phone: "+212 5 39 12 34 56",
    department: "Computer Science",
    office: "Building A, Room 205",
    bio: "Associate Professor specializing in Computer Networks and Cybersecurity. PhD in Computer Science from MIT.",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    qcmSubmissions: true,
    studentQuestions: true,
    systemUpdates: false,
    weeklyReports: true,
    instantAlerts: false,
  })

  // QCM preferences
  const [qcmPreferences, setQcmPreferences] = useState({
    defaultTimeLimit: "30",
    allowRetakes: true,
    showCorrectAnswers: true,
    randomizeQuestions: false,
    autoGrade: true,
    requireExplanations: false,
  })

  // System preferences
  const [systemPreferences, setSystemPreferences] = useState({
    language: "en",
    timezone: "Africa/Casablanca",
    theme: "light",
    dateFormat: "DD/MM/YYYY",
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been successfully updated.",
    })
  }

  const handleResetPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset instructions have been sent to your email.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and QCM settings</p>
        </div>
        <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt={profileSettings.name} />
                    <AvatarFallback className="text-lg">
                      {profileSettings.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2">
                    <Label htmlFor="profile-image" className="cursor-pointer">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                        <Upload className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <Input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{profileSettings.name}</h3>
                  <p className="text-sm text-muted-foreground">{profileSettings.department}</p>
                  <Badge variant="secondary" className="mt-2">
                    Teacher
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office">Office Location</Label>
                  <Input
                    id="office"
                    value={profileSettings.office}
                    onChange={(e) => setProfileSettings({ ...profileSettings, office: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileSettings.bio}
                  onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleResetPassword}>
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="qcm-submissions">QCM Submissions</Label>
                    <p className="text-sm text-muted-foreground">Get notified when students submit QCMs</p>
                  </div>
                  <Switch
                    id="qcm-submissions"
                    checked={notifications.qcmSubmissions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, qcmSubmissions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="student-questions">Student Questions</Label>
                    <p className="text-sm text-muted-foreground">Notifications for student inquiries</p>
                  </div>
                  <Switch
                    id="student-questions"
                    checked={notifications.studentQuestions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, studentQuestions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QCM Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>QCM Preferences</span>
              </CardTitle>
              <CardDescription>Set default preferences for your QCMs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time-limit">Default Time Limit (minutes)</Label>
                  <Select
                    value={qcmPreferences.defaultTimeLimit}
                    onValueChange={(value) => setQcmPreferences({ ...qcmPreferences, defaultTimeLimit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-retakes">Allow Retakes</Label>
                    <p className="text-sm text-muted-foreground">Students can retake QCMs</p>
                  </div>
                  <Switch
                    id="allow-retakes"
                    checked={qcmPreferences.allowRetakes}
                    onCheckedChange={(checked) => setQcmPreferences({ ...qcmPreferences, allowRetakes: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-answers">Show Correct Answers</Label>
                    <p className="text-sm text-muted-foreground">Display correct answers after submission</p>
                  </div>
                  <Switch
                    id="show-answers"
                    checked={qcmPreferences.showCorrectAnswers}
                    onCheckedChange={(checked) => setQcmPreferences({ ...qcmPreferences, showCorrectAnswers: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="randomize">Randomize Questions</Label>
                    <p className="text-sm text-muted-foreground">Shuffle question order for each attempt</p>
                  </div>
                  <Switch
                    id="randomize"
                    checked={qcmPreferences.randomizeQuestions}
                    onCheckedChange={(checked) => setQcmPreferences({ ...qcmPreferences, randomizeQuestions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-grade">Auto Grade</Label>
                    <p className="text-sm text-muted-foreground">Automatically grade submissions</p>
                  </div>
                  <Switch
                    id="auto-grade"
                    checked={qcmPreferences.autoGrade}
                    onCheckedChange={(checked) => setQcmPreferences({ ...qcmPreferences, autoGrade: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>System Preferences</span>
              </CardTitle>
              <CardDescription>Customize your system settings and display preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={systemPreferences.language}
                    onValueChange={(value) => setSystemPreferences({ ...systemPreferences, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={systemPreferences.timezone}
                    onValueChange={(value) => setSystemPreferences({ ...systemPreferences, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Casablanca">Morocco (GMT+1)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (GMT+1)</SelectItem>
                      <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={systemPreferences.theme}
                    onValueChange={(value) => setSystemPreferences({ ...systemPreferences, theme: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select
                    value={systemPreferences.dateFormat}
                    onValueChange={(value) => setSystemPreferences({ ...systemPreferences, dateFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
