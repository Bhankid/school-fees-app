"use client"

import { motion } from "framer-motion"
import { Users, Plus } from "lucide-react"

interface Child {
  id: number
  name: string
  age: number
  school: string
  grade: string
}

interface ChildrenCardProps {
  children: Child[]
}

export function ChildrenCard({ children }: ChildrenCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
            <Users className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold">Your Children</h2>
        </div>
        <button className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="border border-gray-200 rounded-lg p-3 hover:border-red-200 transition-colors"
          >
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mr-3">
                <span className="text-red-600 font-medium">{child.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-medium">{child.name}</h3>
                <p className="text-xs text-gray-500">{child.age} years old</p>
              </div>
            </div>
            <div className="pl-13 ml-13">
              <p className="text-sm text-gray-600">{child.school}</p>
              <p className="text-sm text-gray-600">Grade: {child.grade}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
