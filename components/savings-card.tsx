"use client"

import { motion } from "framer-motion"
import { PiggyBank, TrendingUp } from "lucide-react"

interface SavingsCardProps {
  totalSavings: number
  savingsGoal: number
}

export function SavingsCard({ totalSavings, savingsGoal }: SavingsCardProps) {
  const progress = (totalSavings / savingsGoal) * 100

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-full">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
          <PiggyBank className="w-5 h-5 text-red-600" />
        </div>
        <h2 className="text-lg font-semibold">Savings Progress</h2>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500">Current</span>
          <span className="text-sm font-medium">₵{totalSavings}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-red-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-500">Goal</span>
          <span className="text-sm font-medium">₵{savingsGoal}</span>
        </div>
      </div>

      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors">
        <TrendingUp className="w-4 h-4 mr-2" />
        Add to Savings
      </button>
    </div>
  )
}
