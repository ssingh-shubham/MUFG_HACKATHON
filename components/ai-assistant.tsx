"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, FileText, Bot, User } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant" | "loading"
  content: string
  sources?: string[]
  timestamp: Date
}

const EXAMPLE_QUESTIONS = [
  "What factors affect my financial capacity score?",
  "How does smoking impact investment risk?",
  "What's a balanced portfolio for someone aged 40?",
]

const SIMULATED_RESPONSES = [
  {
    content:
      "Your financial capacity score is influenced by several key factors: your debt-to-income ratio, monthly cash flow, emergency fund size, and overall financial stability. A higher income relative to expenses, lower debt obligations, and substantial savings typically result in better financial capacity scores.",
    sources: ["finance.pdf", "risk_assessment.pdf"],
  },
  {
    content:
      "Smoking significantly impacts investment risk in multiple ways. It increases health insurance premiums, reduces life expectancy (affecting long-term planning), and creates additional healthcare costs that can drain investment funds. Studies show smokers may need 15-20% more retirement savings to account for increased healthcare expenses.",
    sources: ["health.pdf", "demographics.pdf", "actuarial_tables.pdf"],
  },
  {
    content:
      "For a 40-year-old investor, a balanced portfolio typically consists of 60-70% stocks and 30-40% bonds. This allocation provides growth potential while managing risk. Consider diversifying across domestic and international markets, with a mix of large-cap, mid-cap, and small-cap stocks. Regular rebalancing is essential.",
    sources: ["investment_strategies.pdf", "age_based_allocation.pdf", "portfolio_theory.pdf"],
  },
  {
    content:
      "Risk tolerance varies significantly based on age, income stability, family obligations, and personal comfort with market volatility. Younger investors can typically accept higher risk due to longer time horizons, while those approaching retirement should focus on capital preservation.",
    sources: ["risk_profiling.pdf", "behavioral_finance.pdf"],
  },
  {
    content:
      "Emergency funds should cover 3-6 months of living expenses and be kept in easily accessible, low-risk accounts. This fund acts as a financial buffer, preventing the need to liquidate investments during market downturns or unexpected life events.",
    sources: ["emergency_planning.pdf", "liquidity_management.pdf"],
  },
  {
    content:
      "Diversification reduces portfolio risk by spreading investments across different asset classes, sectors, and geographic regions. The key principle is that different investments react differently to market conditions, helping to smooth overall portfolio performance.",
    sources: ["modern_portfolio_theory.pdf", "diversification_strategies.pdf"],
  },
]

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "Hello! I'm your AI Risk Advisor. I can help answer questions about financial planning, risk assessment, and investment strategies. Try asking me one of the suggested questions below, or feel free to ask anything else!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Add loading message
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      type: "loading",
      content: "Retrieving info from documents...",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, loadingMessage])

    // Simulate API delay
    setTimeout(() => {
      const randomResponse = SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)]

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: "assistant",
        content: randomResponse.content,
        sources: randomResponse.sources,
        timestamp: new Date(),
      }

      setMessages((prev) => prev.filter((msg) => msg.type !== "loading").concat(assistantMessage))
      setIsLoading(false)
    }, 2000)
  }

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-[80vh] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Bot className="w-8 h-8 text-blue-400" />
              AI Knowledge Assistant
            </CardTitle>
            <p className="text-blue-200">
              Ask me anything about risk assessment, financial planning, or investment strategies
            </p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col gap-4">
            {/* Example Questions */}
            {messages.length <= 1 && (
              <div className="space-y-3">
                <p className="text-sm text-blue-200">Try these example questions:</p>
                <div className="grid gap-2">
                  {EXAMPLE_QUESTIONS.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleQuestionClick(question)}
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 text-left justify-start h-auto p-3 whitespace-normal"
                      disabled={isLoading}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type !== "user" && (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                        {message.type === "loading" ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                    )}

                    <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-blue-600 text-white ml-auto"
                            : message.type === "loading"
                              ? "bg-white/5 text-blue-200 italic"
                              : "bg-white/10 text-white"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>

                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/20">
                            <p className="text-xs text-blue-200 mb-2">Sources:</p>
                            <div className="flex flex-wrap gap-2">
                              {message.sources.map((source, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs"
                                >
                                  <FileText className="w-3 h-3" />
                                  {source}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-blue-300 mt-1 px-3">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>

                    {message.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about risk assessment, investments, or financial planning..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
