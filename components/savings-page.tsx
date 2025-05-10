"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Loader } from "@/components/loader"
import { PiggyBank, TrendingUp, Calendar, ArrowRight } from "lucide-react"

export function SavingsPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [amount, setAmount] = useState("")

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
          savingsPlans: [
            { id: 1, name: "School Fees", amount: 2000, saved: 1200, deadline: "2025-08-15" },
            { id: 2, name: "Books & Supplies", amount: 500, saved: 300, deadline: "2025-07-20" },
            { id: 3, name: "Extracurricular", amount: 800, saved: 400, deadline: "2025-09-05" },
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

  const handleSave = () => {
    // Simulate saving
    alert(`Added ₵${amount} to savings`)
    setAmount("")
  }

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
          Savings
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-4 mb-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <PiggyBank className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold">Add to Savings</h2>
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₵</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!amount}
            className={`w-full py-2 rounded-lg flex items-center justify-center transition-colors ${
              amount ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Add to Savings
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4">Savings Plans</h2>

          <div className="space-y-4">
            {data.savingsPlans.map((plan, index) => {
              const progress = (plan.saved / plan.amount) * 100
              const deadline = new Date(plan.deadline)

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{plan.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {deadline.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">Saved</span>
                      <span className="text-sm font-medium">
                        ₵{plan.saved} of ₵{plan.amount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className="bg-red-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <button className="w-full text-sm text-red-600 py-1 flex items-center justify-center hover:underline">
                    View Details
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
