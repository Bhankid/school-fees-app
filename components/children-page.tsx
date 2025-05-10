"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Loader } from "@/components/loader"
import { Plus, BookOpen, Pencil, School, GraduationCap } from "lucide-react"

export function ChildrenPage() {
  const [loading, setLoading] = useState(true)
  interface Child {
    id: number
    name: string
    age: number
    school: string
    grade: string
    image: string
    expenses: { id: number; name: string; amount: number; date: string }[]
    savings: { current: number; goal: number }
  }
  const [data, setData] = useState<{ children: Child[] } | null>(null)
  const [activeChild, setActiveChild] = useState<Child | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const children = [
          {
            id: 1,
            name: "Emma",
            age: 8,
            school: "Greenwood Elementary",
            grade: "3rd",
            image: "/Emma.jpeg",
            expenses: [
              { id: 1, name: "School Fees", amount: 300, date: "2025-04-10" },
              { id: 2, name: "Books", amount: 75, date: "2025-04-05" },
            ],
            savings: { current: 1500, goal: 3000 },
          },
          {
            id: 2,
            name: "Noah",
            age: 12,
            school: "Riverside Middle School",
            grade: "7th",
            image: "/Noah.jpeg",
            expenses: [
              { id: 3, name: "School Fees", amount: 450, date: "2025-04-15" },
              { id: 4, name: "Uniform", amount: 85, date: "2025-04-01" },
            ],
            savings: { current: 1000, goal: 2000 },
          },
        ]

        setData({ children })
        setActiveChild(children[0])
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
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-red-600"
          >
            Children
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
          className="flex gap-3 overflow-x-auto pb-2 mb-6"
        >
          {data?.children?.map((child, index) => (
            <motion.button
              key={child.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveChild(child)}
              className={`flex flex-col items-center min-w-[80px] p-2 rounded-lg ${
                activeChild?.id === child.id ? "bg-red-50 border border-red-200" : "bg-white border border-gray-200"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-red-100 mb-2 overflow-hidden">
                <img src={child.image || "/placeholder.svg"} alt={child.name} className="w-full h-full object-cover" />
              </div>
              <span
                className={`text-sm font-medium ${activeChild?.id === child.id ? "text-red-600" : "text-gray-700"}`}
              >
                {child.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {activeChild && (
          <motion.div
            key={activeChild.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-full bg-red-100 mr-4 overflow-hidden">
                  <img
                    src={activeChild.image || "/placeholder.svg"}
                    alt={activeChild.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">{activeChild.name}</h2>
                    <button className="text-gray-500 hover:text-red-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-500">{activeChild.age} years old</p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <School className="w-4 h-4 mr-1 text-red-500" />
                      {activeChild.school}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-1 text-red-500" />
                      Grade: {activeChild.grade}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-4 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  <BookOpen className="w-4 h-4 text-red-600" />
                </div>
                <h3 className="font-medium">Education Savings</h3>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Current</span>
                  <span className="text-sm font-medium">₵{activeChild.savings.current}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className="bg-red-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(activeChild.savings.current / activeChild.savings.goal) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-500">Goal</span>
                  <span className="text-sm font-medium">₵{activeChild.savings.goal}</span>
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors">
                Add to Savings
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recent Expenses</h3>
                <button className="text-sm text-red-600">View All</button>
              </div>

              <div className="space-y-3">
                {activeChild.expenses.map((expense, index) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium">{expense.name}</h4>
                      <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                    <p className="font-semibold text-red-600">₵{expense.amount}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
