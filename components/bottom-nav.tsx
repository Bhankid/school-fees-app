"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, PiggyBank, BookOpen, Users, Settings } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const tabs = [
    { id: "home", icon: Home, label: "Home", href: "/dashboard" },
    { id: "savings", icon: PiggyBank, label: "Savings", href: "/savings" },
    { id: "expenses", icon: BookOpen, label: "Expenses", href: "/expenses" },
    { id: "children", icon: Users, label: "Children", href: "/children" },
    { id: "settings", icon: Settings, label: "Settings", href: "/settings" },
  ]

  const getActiveTab = () => {
    const path = pathname || ""
    const tab = tabs.find((tab) => path.includes(tab.href))
    return tab ? tab.id : "home"
  }

  const activeTab = getActiveTab()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center ${isActive ? "text-red-600" : "text-gray-500"}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-0 w-12 h-1 bg-red-600 rounded-t-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
