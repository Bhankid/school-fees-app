"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react"

export function SettingsPage() {
  const [user, setUser] = useState({
    name: "Engineer Bhankid",
    email: "alfred.bhankid@gmail.com",
    avatar: "/Logo.jpg",
  })

  const settingsSections = [
    {
      id: "account",
      icon: User,
      title: "Account Settings",
      description: "Manage your personal information",
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications",
      description: "Configure your notification preferences",
    },
    {
      id: "security",
      icon: Shield,
      title: "Security",
      description: "Update password and security settings",
    },
    {
      id: "help",
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help with the app",
    },
  ]

  return (
    <Layout>
      <div className="p-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-red-600 mb-6"
        >
          Settings
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-4 mb-6"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 mr-4 overflow-hidden">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <button className="mt-1 text-sm text-red-600">Edit Profile</button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {settingsSections.map((section, index) => {
            const Icon = section.icon

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            )
          })}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="w-full bg-white rounded-xl shadow-md p-4 flex items-center justify-between mt-6"
          >
            <div className="flex items-center text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-medium">Log Out</span>
            </div>
          </motion.button>
        </div>
      </div>
    </Layout>
  )
}
