"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

type PlanetInfo = {
  name: string
  color: string
  size: number
  orbitRadius: number
  orbitSpeed: number
}

type SolarSystemDiagramProps = {
  title: string
  description: string
  planets: PlanetInfo[]
}

const defaultPlanets: PlanetInfo[] = [
  {
    name: "Mercury",
    color: "#A9A9A9",
    size: 3.8,
    orbitRadius: 50,
    orbitSpeed: 8,
  },
  {
    name: "Venus",
    color: "#E6C229",
    size: 9.5,
    orbitRadius: 75,
    orbitSpeed: 12,
  },
  {
    name: "Earth",
    color: "#4B90E6",
    size: 10,
    orbitRadius: 100,
    orbitSpeed: 16,
  },
  {
    name: "Mars",
    color: "#E67F4B",
    size: 5.3,
    orbitRadius: 125,
    orbitSpeed: 20,
  },
  {
    name: "Jupiter",
    color: "#E6A54B",
    size: 20,
    orbitRadius: 170,
    orbitSpeed: 30,
  },
  {
    name: "Saturn",
    color: "#EAD6A6",
    size: 17,
    orbitRadius: 210,
    orbitSpeed: 35,
  },
  {
    name: "Uranus",
    color: "#73C2FB",
    size: 14,
    orbitRadius: 250,
    orbitSpeed: 40,
  },
  {
    name: "Neptune",
    color: "#3E66F9",
    size: 13.5,
    orbitRadius: 290,
    orbitSpeed: 45,
  },
]

export function SolarSystemDiagram({
  title = "Our Solar System",
  description = "The eight planets of our solar system orbit around the Sun.",
  planets = defaultPlanets,
}: Partial<SolarSystemDiagramProps>) {
  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-center mb-2 text-white">{title}</h3>
        <p className="text-center text-white mb-6">{description}</p>

        <div className="relative h-[300px] w-full">
          {/* Sun */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              className="rounded-full bg-yellow-500"
              style={{
                width: "30px",
                height: "30px",
                boxShadow: "0 0 30px #f59e0b, 0 0 60px #f59e0b50",
              }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 30px #f59e0b, 0 0 60px #f59e0b50",
                  "0 0 40px #f59e0b, 0 0 80px #f59e0b60",
                  "0 0 30px #f59e0b, 0 0 60px #f59e0b50",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>

          {/* Planets */}
          {planets.map((planet, index) => (
            <div key={index} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Orbit */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: `${planet.orbitRadius * 2}px`,
                  height: `${planet.orbitRadius * 2}px`,
                  borderColor: `${planet.color}30`,
                }}
              />

              {/* Planet */}
              <motion.div
                className="absolute"
                style={{
                  width: `${planet.size * 2}px`,
                  height: `${planet.size * 2}px`,
                  x: -planet.size,
                  y: -planet.size,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: planet.orbitSpeed,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="absolute"
                  style={{
                    left: `${planet.orbitRadius}px`,
                    top: 0,
                    width: `${planet.size * 2}px`,
                    height: `${planet.size * 2}px`,
                    backgroundColor: planet.color,
                    borderRadius: "50%",
                    boxShadow: `0 0 10px ${planet.color}50`,
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: `0 0 20px ${planet.color}80`,
                  }}
                />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {planets.map((planet, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: planet.color }} />
              <span className="text-white text-sm">{planet.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

