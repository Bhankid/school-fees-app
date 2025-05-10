"use client"

import { motion } from "framer-motion"
import { BookOpen, Plus } from "lucide-react"

interface Expense {
  id: number
  name: string
  amount: number
  date: string
}

interface ExpensesCardProps {
  expenses: Expense[]
}

export function ExpensesCard({ expenses }: ExpensesCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
            <BookOpen className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold">Recent Expenses</h2>
        </div>
        <button className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div>
              <p className="font-medium">{expense.name}</p>
              <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
            </div>
            <p className="font-semibold text-red-600">₵{expense.amount}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
