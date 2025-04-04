"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

const spaceFacts = [
  "There are more stars in the universe than grains of sand on all the beaches on Earth!",
  "The Sun is so big that about 1.3 million Earths could fit inside it!",
  "A day on Venus is longer than a year on Venus!",
  "Saturn's rings are made mostly of ice and rock!",
  "The footprints left by astronauts on the Moon will stay there for at least 100 million years!",
  "The largest volcano in our solar system is on Mars. It's called Olympus Mons!",
  "Jupiter has 79 moons! That's like having a huge moon family!",
  "Space is completely silent because there is no air to carry sound waves!",
  "The Milky Way galaxy is moving through space at 1.3 million miles per hour!",
  "A neutron star is so dense that a teaspoon of it would weigh about 4 billion tons!",
]

export function SpaceFacts() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentFactIndex((prevIndex) => (prevIndex === spaceFacts.length - 1 ? 0 : prevIndex + 1))
        setIsVisible(true)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-900/60 border-purple-900/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-center mb-4 text-white">Amazing Space Facts</h3>

        <div className="h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={currentFactIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center text-blue-200"
              >
                <p>{spaceFacts[currentFactIndex]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

