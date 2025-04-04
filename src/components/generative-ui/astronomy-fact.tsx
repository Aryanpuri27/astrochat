"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

type AstronomyFactProps = {
  fact: string
  icon?: React.ReactNode
}

export function AstronomyFact({
  fact = "There are more stars in the universe than grains of sand on all the beaches on Earth!",
  icon,
}: AstronomyFactProps) {
  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="flex-shrink-0"
          >
            {icon || <Sparkles className="h-8 w-8 text-yellow-400" />}
          </motion.div>

          <div className="flex-1">
            <motion.p
              className="text-lg text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {fact}
            </motion.p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

