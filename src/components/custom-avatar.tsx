"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, User, Bot } from "lucide-react"

type CustomAvatarProps = {
  type: "ai" | "user"
  isAnimating?: boolean
  size?: "sm" | "md" | "lg"
}

export function CustomAvatar({ type, isAnimating = false, size = "md" }: CustomAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const getAvatarContent = () => {
    if (type === "ai") {
      return (
        <>
          <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-700">
            <motion.div
              animate={
                isAnimating
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: isAnimating ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" }}
            >
              <Bot className="h-5 w-5 text-white" />
            </motion.div>
          </AvatarFallback>
        </>
      )
    } else {
      return (
        <>
          <AvatarImage src="/user-avatar.png" alt="User" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600">
            <User className="h-5 w-5 text-white" />
          </AvatarFallback>
        </>
      )
    }
  }

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} border-2 ${type === "ai" ? "border-purple-500" : "border-blue-500"}`}>
        {getAvatarContent()}
      </Avatar>

      {type === "ai" && isAnimating && (
        <motion.div
          className="absolute -top-1 -right-1 bg-purple-600 rounded-full p-0.5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles className="h-3 w-3 text-white" />
        </motion.div>
      )}
    </div>
  )
}

