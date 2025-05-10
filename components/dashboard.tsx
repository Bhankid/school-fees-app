"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { SavingsCard } from "@/components/savings-card"
import { ExpensesCard } from "@/components/expenses-card"
import { ChildrenCard } from "@/components/children-card"
import { Loader } from "@/components/loader"

export function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        setData({
          totalSavings: 2500,
          savingsGoal: 5000,
          recentExpenses: [
            { id: 1, name: "School Fees", amount: 500, date: "2025-04-15" },
            { id: 2, name: "Books", amount: 120, date: "2025-04-10" },
            { id: 3, name: "Uniform", amount: 85, date: "2025-04-05" },
          ],
          children: [
            { id: 1, name: "Emma", age: 8, school: "Greenwood Elementary", grade: "3rd" },
            { id: 2, name: "Noah", age: 12, school: "Riverside Middle School", grade: "7th" },
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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-red-600 mb-6"
        >
          Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SavingsCard totalSavings={data.totalSavings} savingsGoal={data.savingsGoal} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ExpensesCard expenses={data.recentExpenses} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <ChildrenCard children={data.children} />
        </motion.div>
      </div>
    </Layout>
  )
}
