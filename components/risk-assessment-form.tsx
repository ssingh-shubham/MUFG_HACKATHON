"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

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

interface RiskAssessmentFormProps {
  onSubmit: (data: FormData) => void
  onBack: () => void
}

export function RiskAssessmentForm({ onSubmit, onBack }: RiskAssessmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    age: 35,
    incomeRange: "",
    loanAmount: "",
    monthlyExpenses: "",
    smokes: false,
    chronicIllness: false,
    educationLevel: "",
    investmentHorizon: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isFormValid =
    formData.incomeRange &&
    formData.loanAmount &&
    formData.monthlyExpenses &&
    formData.educationLevel &&
    formData.investmentHorizon

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-slide-in">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20 text-white transition-all duration-300 hover:bg-white/15">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-white">Risk Assessment</CardTitle>
          <CardDescription className="text-blue-200 text-base sm:text-lg">
            Help us understand your profile to provide personalized risk insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age Slider */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Label className="text-white text-base sm:text-lg">Age: {formData.age}</Label>
              <Slider
                value={[formData.age]}
                onValueChange={(value) => setFormData({ ...formData, age: value[0] })}
                max={80}
                min={18}
                step={1}
                className="w-full transition-all duration-300"
              />
              <div className="flex justify-between text-xs sm:text-sm text-blue-200">
                <span>18</span>
                <span>80</span>
              </div>
            </div>

            {/* Income Range */}
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Label className="text-white text-base sm:text-lg">Annual Income Range</Label>
              <Select
                value={formData.incomeRange}
                onValueChange={(value) => setFormData({ ...formData, incomeRange: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white transition-all duration-300 hover:bg-white/15">
                  <SelectValue placeholder="Select your income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-30k">Under $30,000</SelectItem>
                  <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                  <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                  <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                  <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                  <SelectItem value="150k-250k">$150,000 - $250,000</SelectItem>
                  <SelectItem value="over-250k">Over $250,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loan Amount and Monthly Expenses */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <Label className="text-white text-base sm:text-lg">Loan Amount ($)</Label>
                <Input
                  type="number"
                  placeholder="Enter total loans"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                />
              </div>
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <Label className="text-white text-base sm:text-lg">Monthly Expenses ($)</Label>
                <Input
                  type="number"
                  placeholder="Enter expenses"
                  value={formData.monthlyExpenses}
                  onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                />
              </div>
            </div>

            {/* Health Questions */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg transition-all duration-300 hover:bg-white/10">
                <Label className="text-white text-base sm:text-lg">Do you smoke?</Label>
                <Switch
                  checked={formData.smokes}
                  onCheckedChange={(checked) => setFormData({ ...formData, smokes: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg transition-all duration-300 hover:bg-white/10">
                <Label className="text-white text-base sm:text-lg">Chronic illness?</Label>
                <Switch
                  checked={formData.chronicIllness}
                  onCheckedChange={(checked) => setFormData({ ...formData, chronicIllness: checked })}
                />
              </div>
            </div>

            {/* Education Level and Investment Horizon */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <Label className="text-white text-base sm:text-lg">Education Level</Label>
                <Select
                  value={formData.educationLevel}
                  onValueChange={(value) => setFormData({ ...formData, educationLevel: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white transition-all duration-300 hover:bg-white/15">
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="some-college">Some College</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                <Label className="text-white text-base sm:text-lg">Investment Timeline</Label>
                <Select
                  value={formData.investmentHorizon}
                  onValueChange={(value) => setFormData({ ...formData, investmentHorizon: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white transition-all duration-300 hover:bg-white/15">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short Term (1-3 years)</SelectItem>
                    <SelectItem value="medium">Medium Term (3-7 years)</SelectItem>
                    <SelectItem value="long">Long Term (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid}
                className="flex-1 bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Calculate Risk Score
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
