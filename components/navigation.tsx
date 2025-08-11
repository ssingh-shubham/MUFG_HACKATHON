"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  activeTab: "risk-mirror" | "ai-assistant" | "about"
  onTabChange: (tab: "risk-mirror" | "ai-assistant" | "about") => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleTabChange = (tab: "risk-mirror" | "ai-assistant" | "about") => {
    onTabChange(tab)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white transition-all duration-300 hover:scale-105">
              RiskLens AI
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Button
              variant={activeTab === "risk-mirror" ? "secondary" : "ghost"}
              onClick={() => handleTabChange("risk-mirror")}
              className="text-white hover:text-blue-200 transition-all duration-300 hover:scale-105"
            >
              Risk Mirror
            </Button>
            <Button
              variant={activeTab === "ai-assistant" ? "secondary" : "ghost"}
              onClick={() => handleTabChange("ai-assistant")}
              className="text-white hover:text-blue-200 transition-all duration-300 hover:scale-105"
            >
              AI Assistant
            </Button>
            <Button
              variant={activeTab === "about" ? "secondary" : "ghost"}
              onClick={() => handleTabChange("about")}
              className="text-white hover:text-blue-200 transition-all duration-300 hover:scale-105"
            >
              About
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-200 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/5 backdrop-blur-sm rounded-lg mb-2">
            <Button
              variant={activeTab === "risk-mirror" ? "secondary" : "ghost"}
              onClick={() => handleTabChange("risk-mirror")}
              className="w-full text-left justify-start text-white hover:text-blue-200 transition-all duration-300"
            >
              Risk Mirror
            </Button>
            <Button
              variant={activeTab === "ai-assistant" ? "secondary" : "ghost"}
              onClick={() => handleTabChange("ai-assistant")}
              className="w-full text-left justify-start text-white hover:text-blue-200 transition-all duration-300"
            >
              AI Assistant
            </Button>
            <Button
              variant={activeTab === "about" ? "secondary" : "ghost"}
              onClick={() => handleTabChange("about")}
              className="w-full text-left justify-start text-white hover:text-blue-200 transition-all duration-300"
            >
              About
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
