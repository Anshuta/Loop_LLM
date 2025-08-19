"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, MessageSquare, BarChart3 } from "lucide-react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

const mockAnalysisData = [
  { metric: "Demonstrating Engagement", value: 85, fullMark: 100 },
  { metric: "Establishing Common Context", value: 72, fullMark: 100 },
  { metric: "Displaying Emotional Charge", value: 68, fullMark: 100 },
  { metric: "Supporting Group Cohesion", value: 78, fullMark: 100 },
  { metric: "Applying Social Protocol", value: 45, fullMark: 100 },
]

export default function ConversationAnalysisApp() {
  const [chatGptUrl, setChatGptUrl] = useState<string>("")
  const [analysisData, setAnalysisData] = useState<typeof mockAnalysisData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isValidUrl, setIsValidUrl] = useState(false)

  const validateChatGptUrl = (url: string) => {
    const chatGptPattern = /^https:\/\/chatgpt\.com\/share\/[a-zA-Z0-9-]+/
    return chatGptPattern.test(url)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setChatGptUrl(url)
    setIsValidUrl(validateChatGptUrl(url))
    setAnalysisData(null)
  }

  const analyzeConversation = async () => {
    if (!chatGptUrl || !isValidUrl) return

    setIsAnalyzing(true)
    // Simulate analysis processing
    setTimeout(() => {
      console.log("[v0] Analysis data:", mockAnalysisData)
      setAnalysisData(mockAnalysisData)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Conversation Analysis</h1>
          <p className="text-muted-foreground">
            Analyze ChatGPT conversations using LIWC-based social dynamics framework
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              ChatGPT Conversation Link
            </CardTitle>
            <CardDescription>Paste your ChatGPT conversation share link to analyze social dynamics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="url"
                  placeholder="https://chatgpt.com/share/your-conversation-id"
                  value={chatGptUrl}
                  onChange={handleUrlChange}
                  className={`${chatGptUrl && !isValidUrl ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {chatGptUrl && !isValidUrl && (
                  <p className="text-sm text-destructive">Please enter a valid ChatGPT share link</p>
                )}
                {isValidUrl && <p className="text-sm text-green-600">Valid ChatGPT share link detected</p>}
              </div>

              <div className="flex items-center justify-center p-6 border border-dashed rounded-lg bg-muted/20">
                <div className="text-center space-y-3">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium">Ready to analyze</p>
                    <p className="text-sm text-muted-foreground">
                      {chatGptUrl
                        ? "Click analyze to start social dynamics analysis"
                        : "Enter a ChatGPT share link above"}
                    </p>
                  </div>
                  <Button onClick={analyzeConversation} disabled={!isValidUrl || isAnalyzing} className="mt-4">
                    {isAnalyzing ? "Analyzing..." : "Analyze Conversation"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {analysisData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Social Dynamics Analysis
              </CardTitle>
              <CardDescription>Word proportion analysis across five social dynamics dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={analysisData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Social Dynamics"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      fill="url(#colorGradient)"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                        <stop offset="25%" stopColor="hsl(var(--chart-2))" />
                        <stop offset="50%" stopColor="hsl(var(--chart-3))" />
                        <stop offset="75%" stopColor="hsl(var(--chart-4))" />
                        <stop offset="100%" stopColor="hsl(var(--chart-5))" />
                      </linearGradient>
                    </defs>
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisData.map((item, index) => {
                  const chartColors = [
                    "hsl(var(--chart-1))",
                    "hsl(var(--chart-2))",
                    "hsl(var(--chart-3))",
                    "hsl(var(--chart-4))",
                    "hsl(var(--chart-5))",
                  ]
                  const color = chartColors[index % chartColors.length]

                  return (
                    <div
                      key={item.metric}
                      className="text-center p-3 bg-muted/50 rounded-lg border-l-4"
                      style={{ borderLeftColor: color }}
                    >
                      <p className="text-sm font-medium text-muted-foreground">{item.metric}</p>
                      <p className="text-2xl font-bold text-foreground">{item.value}%</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
