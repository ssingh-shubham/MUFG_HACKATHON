"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LandingHero } from "@/components/landing-hero"
import { RiskAssessmentForm } from "@/components/risk-assessment-form"
import { ResultsDashboard } from "@/components/results-dashboard"
import { AIAssistant } from "@/components/ai-assistant"

interface FormData {
  age: number
  incomeRange: string
  loanAmount: string
  monthlyExpenses: string
  smokes: boolean
  chronicIllness: boolean
  educationLevel: string
  investmentHorizon: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"risk-mirror" | "ai-assistant" | "about">("risk-mirror")
  const [showAssessment, setShowAssessment] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [assessmentData, setAssessmentData] = useState<FormData | null>(null)

  const handleGetStarted = () => {
    setShowAssessment(true)
  }

  const handleTabChange = (tab: "risk-mirror" | "ai-assistant" | "about") => {
    setActiveTab(tab)
    if (tab === "risk-mirror") {
      setShowAssessment(false)
      setShowResults(false)
    }
  }

  const handleFormSubmit = (data: FormData) => {
    setAssessmentData(data)
    setShowResults(true)
    setShowAssessment(false)
  }

  const handleBackToForm = () => {
    setShowAssessment(false)
  }

  const handleStartOver = () => {
    setShowResults(false)
    setShowAssessment(false)
    setAssessmentData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      <main>
        {activeTab === "risk-mirror" && !showAssessment && !showResults && (
          <LandingHero onGetStarted={handleGetStarted} />
        )}

        {activeTab === "risk-mirror" && showAssessment && (
          <RiskAssessmentForm onSubmit={handleFormSubmit} onBack={handleBackToForm} />
        )}

        {activeTab === "risk-mirror" && showResults && assessmentData && (
          <ResultsDashboard formData={assessmentData} onStartOver={handleStartOver} />
        )}

        {/* Added AI Assistant component */}
        {activeTab === "ai-assistant" && <AIAssistant />}

        {activeTab === "about" && (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-white text-center max-w-2xl">
              <h2 className="text-3xl font-bold mb-6">About RiskLens AI</h2>
              <p className="text-blue-200 text-lg leading-relaxed">
                RiskLens AI combines advanced artificial intelligence with comprehensive risk analysis to provide
                personalized insights for your financial, health, and lifestyle decisions. Our platform helps you
                understand your risk profile and make informed choices for a better future.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-center text-sm text-blue-200">
            ⚠️ This is a simulated website for demonstration purposes only - does not work with real data
          </p>
          <p className="text-center text-xs text-blue-300 mt-1">Powered by Vercel + OpenAI + Pinecone</p>
        </div>
      </footer>
    </div>
  )
}
