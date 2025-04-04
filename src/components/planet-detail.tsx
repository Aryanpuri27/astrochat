"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowLeft, Info, Book, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type PlanetProps = {
  id: string
  name: string
  color: string
  description: string
  facts: string[]
  details: {
    diameter: string
    distance: string
    dayLength: string
    yearLength: string
    moons: string
    temperature: string
    gravity: string
    composition: string
  }
  images: string[]
}

export function PlanetDetail({ planet }: { planet: PlanetProps }) {
  const [activeTab, setActiveTab] = useState<"overview" | "facts" | "gallery">("overview")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(true)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % planet.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? planet.images.length - 1 : prev - 1))
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-purple-900/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Solar System
          </Button>
        </Link>
      </div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: planet.color }}
      >
        {planet.name}
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Planet 3D Model/Image */}
        <Card className="glass overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative w-64 h-64 mb-4">
              <motion.div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: planet.color, boxShadow: `0 0 40px ${planet.color}50` }}
                animate={
                  isRotating
                    ? {
                        rotateY: [0, 360],
                        boxShadow: [
                          `0 0 40px ${planet.color}50`,
                          `0 0 60px ${planet.color}70`,
                          `0 0 40px ${planet.color}50`,
                        ],
                      }
                    : {}
                }
                transition={{
                  rotateY: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  boxShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                }}
              >
                {/* Planet surface details */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2),transparent_40%)]"></div>

                  {planet.id === "earth" && (
                    <>
                      <div className="absolute w-[30%] h-[20%] bg-green-700 rounded-full top-[20%] left-[30%]"></div>
                      <div className="absolute w-[40%] h-[25%] bg-green-700 rounded-full top-[50%] left-[10%]"></div>
                    </>
                  )}

                  {planet.id === "mars" && (
                    <>
                      <div className="absolute w-[15%] h-[15%] bg-red-900 rounded-full top-[30%] left-[20%]"></div>
                      <div className="absolute w-[20%] h-[20%] bg-red-900 rounded-full top-[60%] left-[60%]"></div>
                    </>
                  )}

                  {planet.id === "jupiter" && (
                    <>
                      <div className="absolute w-[60%] h-[10%] bg-orange-800 rounded-full top-[30%] left-[20%]"></div>
                      <div className="absolute w-[70%] h-[8%] bg-orange-700 rounded-full top-[50%] left-[15%]"></div>
                      <div className="absolute w-[40%] h-[15%] bg-red-700 rounded-full top-[65%] left-[30%]"></div>
                    </>
                  )}

                  {planet.id === "saturn" && (
                    <div className="absolute w-[140%] h-[20px] bg-[#EAD6A6] rounded-full top-[50%] left-[-20%] rotate-12 opacity-70"></div>
                  )}
                </div>
              </motion.div>

              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-0 right-0 text-white bg-purple-900/50 hover:bg-purple-800/50"
                onClick={() => setIsRotating(!isRotating)}
              >
                {isRotating ? "Pause" : "Rotate"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Planet Information */}
        <Card className="glass overflow-hidden">
          <CardContent className="p-0">
            <div className="flex border-b border-purple-900/30">
              <TabButton
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                icon={<Info className="h-4 w-4 mr-2" />}
                label="Overview"
              />
              <TabButton
                active={activeTab === "facts"}
                onClick={() => setActiveTab("facts")}
                icon={<Book className="h-4 w-4 mr-2" />}
                label="Fun Facts"
              />
              <TabButton
                active={activeTab === "gallery"}
                onClick={() => setActiveTab("gallery")}
                icon={<Rocket className="h-4 w-4 mr-2" />}
                label="Gallery"
              />
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white mb-6">{planet.description}</p>

                    <h3 className="text-lg font-semibold text-purple-300 mb-3">Planet Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem label="Diameter" value={planet.details.diameter} />
                      <DetailItem label="Distance from Sun" value={planet.details.distance} />
                      <DetailItem label="Day Length" value={planet.details.dayLength} />
                      <DetailItem label="Year Length" value={planet.details.yearLength} />
                      <DetailItem label="Moons" value={planet.details.moons} />
                      <DetailItem label="Temperature" value={planet.details.temperature} />
                      <DetailItem label="Gravity" value={planet.details.gravity} />
                      <DetailItem label="Composition" value={planet.details.composition} />
                    </div>
                  </motion.div>
                )}

                {activeTab === "facts" && (
                  <motion.div
                    key="facts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-purple-300 mb-4">Amazing Facts About {planet.name}</h3>
                    <ul className="space-y-3">
                      {planet.facts.map((fact, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2 text-white"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="mt-1 min-w-4">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: planet.color }}></div>
                          </div>
                          <p>{fact}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === "gallery" && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <h3 className="text-lg font-semibold text-purple-300 mb-4">{planet.name} Gallery</h3>

                    <div className="relative h-[250px] w-full mb-4 overflow-hidden rounded-lg">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={planet.images[currentImageIndex] || "/placeholder.svg?height=250&width=400"}
                              alt={`${planet.name} image ${currentImageIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex justify-center gap-2">
                      {planet.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? "bg-purple-500" : "bg-gray-500"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Content Section */}
      <Card className="glass overflow-hidden mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Explore {planet.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ExploreCard
              title="3D Model"
              description={`Interact with a 3D model of ${planet.name} and learn about its features.`}
              color={planet.color}
              icon={
                <motion.div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: planet.color }}
                  animate={{
                    rotate: [0, 360],
                    boxShadow: [
                      `0 0 10px ${planet.color}50`,
                      `0 0 20px ${planet.color}70`,
                      `0 0 10px ${planet.color}50`,
                    ],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              }
            />

            <ExploreCard
              title="Surface Map"
              description={`Explore the surface features and geography of ${planet.name}.`}
              color={planet.color}
              icon={
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full" style={{ backgroundColor: planet.color }}></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.3),transparent_40%)] rounded-full"></div>
                  <motion.div
                    className="absolute w-6 h-1 bg-white/30 rounded-full top-3 left-3"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{ transformOrigin: "center" }}
                  />
                </div>
              }
            />

            <ExploreCard
              title="Space Missions"
              description={`Learn about the missions that have visited ${planet.name}.`}
              color={planet.color}
              icon={
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Rocket className="h-12 w-12" style={{ color: planet.color }} />
                </motion.div>
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      className={`flex-1 py-3 px-4 flex items-center justify-center text-sm font-medium transition-colors relative
        ${active ? "text-white" : "text-gray-400 hover:text-gray-300"}`}
      onClick={onClick}
    >
      {icon}
      {label}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-purple-300 text-sm font-medium">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}

function ExploreCard({
  title,
  description,
  color,
  icon,
}: {
  title: string
  description: string
  color: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      className="bg-slate-800/50 rounded-lg p-4 border border-purple-900/30 hover:border-purple-500/50 transition-colors"
      whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${color}30` }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
        <Button variant="link" className="mt-2 text-purple-300 hover:text-purple-200">
          Coming Soon
        </Button>
      </div>
    </motion.div>
  )
}

