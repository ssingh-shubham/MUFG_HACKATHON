"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LandingHeroProps {
  onGetStarted: () => void
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-500 hover:scale-105">
            RiskLens AI
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto transition-all duration-300">
            Your Personal Financial, Health, and Lifestyle Risk Advisor
          </p>
          <p className="text-base sm:text-lg text-blue-200 mb-12 max-w-2xl mx-auto transition-all duration-300">
            Get personalized risk insights and AI-powered recommendations to make smarter decisions about your future.
          </p>
        </div>

        <div className="mb-12 animate-bounce-in">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            Get My Risk Score
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto animate-stagger-in">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-6 text-white transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl">
            <div className="text-2xl sm:text-3xl mb-4 transition-transform duration-300 hover:scale-110">📊</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Risk Assessment</h3>
            <p className="text-sm sm:text-base text-blue-100">
              Comprehensive analysis of your financial, health, and lifestyle factors
            </p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-6 text-white transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl">
            <div className="text-2xl sm:text-3xl mb-4 transition-transform duration-300 hover:scale-110">🤖</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">AI Insights</h3>
            <p className="text-sm sm:text-base text-blue-100">
              Personalized recommendations powered by advanced AI algorithms
            </p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-6 text-white transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl sm:col-span-2 lg:col-span-1">
            <div className="text-2xl sm:text-3xl mb-4 transition-transform duration-300 hover:scale-110">📈</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Smart Planning</h3>
            <p className="text-sm sm:text-base text-blue-100">
              Data-driven strategies to optimize your financial and health outcomes
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
