"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

type ComparisonItem = {
  name: string
  size: number
  color: string
  description: string
}

type SpaceComparisonProps = {
  title: string
  description: string
  items: ComparisonItem[]
  comparisonType: "size" | "distance" | "temperature"
}

export function SpaceComparison({
  title = "Planet Size Comparison",
  description = "A comparison of planet sizes in our solar system",
  items = [
    {
      name: "Earth",
      size: 100,
      color: "#4B90E6",
      description: "Our home planet",
    },
    {
      name: "Jupiter",
      size: 1120,
      color: "#E6A54B",
      description: "The largest planet in our solar system",
    },
    {
      name: "Mars",
      size: 53,
      color: "#E67F4B",
      description: "The red planet",
    },
  ],
  comparisonType = "size",
}: Partial<SpaceComparisonProps>) {
  // Find the maximum size for scaling
  const maxSize = Math.max(...items.map((item) => item.size))

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-center mb-2 text-white">{title}</h3>
        <p className="text-center text-white mb-6">{description}</p>

        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center w-full mb-2">
                <p className="text-white font-medium w-24">{item.name}</p>
                <div className="flex-1 relative h-8">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.size / maxSize) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                <p className="text-white w-24 text-right">
                  {comparisonType === "size"
                    ? `${item.size.toLocaleString()} km`
                    : comparisonType === "distance"
                      ? `${item.size.toLocaleString()} million km`
                      : `${item.size}°C`}
                </p>
              </div>
              <p className="text-sm text-gray-300 text-center">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

