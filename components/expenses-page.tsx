"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Loader } from "@/components/loader"
import { Plus, Filter, Calendar, ArrowUpDown } from "lucide-react"

export function ExpensesPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        setData({
          expenses: [
            { id: 1, name: "School Fees", amount: 500, date: "2025-04-15", category: "fees" },
            { id: 2, name: "Books", amount: 120, date: "2025-04-10", category: "supplies" },
            { id: 3, name: "Uniform", amount: 85, date: "2025-04-05", category: "supplies" },
            { id: 4, name: "School Trip", amount: 150, date: "2025-03-20", category: "activities" },
            { id: 5, name: "Lunch Money", amount: 60, date: "2025-03-15", category: "food" },
            { id: 6, name: "Tuition", amount: 350, date: "2025-03-10", category: "fees" },
          ],
        })
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredExpenses = data?.expenses.filter((expense) => filter === "all" || expense.category === filter)

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-red-600"
          >
            Expenses
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-4"
        >
          {["all", "fees", "supplies", "activities", "food"].map((category, index) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                filter === category ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                <Filter className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm font-medium">Filter & Sort</span>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                <Calendar className="w-3 h-3 mr-1" />
                Date
              </button>
              <button className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                <ArrowUpDown className="w-3 h-3 mr-1" />
                Amount
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{expense.name}</h3>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">{new Date(expense.date).toLocaleDateString()}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                    {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-lg font-semibold text-red-600">₵{expense.amount}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
