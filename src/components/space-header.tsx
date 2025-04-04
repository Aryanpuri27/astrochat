"use client"

import type React from "react"

import { useState } from "react"
import { Rocket, Menu, X, SpaceIcon as Planet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"

export function SpaceHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="border-b border-purple-900/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <motion.div
                className="flex items-center gap-2"
                animate={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Rocket className="h-6 w-6 text-purple-400" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Astronomy Explorer
                </h1>
              </motion.div>
            </Link>
          </motion.div>

          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          ) : (
            <>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/planets/mercury">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Mercury" color="gray" />
                </Link>
                <Link href="/planets/venus">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Venus" color="yellow" />
                </Link>
                <Link href="/planets/earth">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Earth" color="blue" />
                </Link>
                <Link href="/planets/mars">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Mars" color="red" />
                </Link>
                <Link href="/planets/jupiter">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Jupiter" color="orange" />
                </Link>
              </nav>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/">
                  <Button className="cosmic-btn text-white">Explore Space</Button>
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-2"
            >
              <nav className="flex flex-col gap-2">
                <Link href="/planets/mercury">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Mercury" color="gray" />
                </Link>
                <Link href="/planets/venus">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Venus" color="yellow" />
                </Link>
                <Link href="/planets/earth">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Earth" color="blue" />
                </Link>
                <Link href="/planets/mars">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Mars" color="red" />
                </Link>
                <Link href="/planets/jupiter">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Jupiter" color="orange" />
                </Link>
                <Link href="/planets/saturn">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Saturn" color="yellow" />
                </Link>
                <Link href="/planets/uranus">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Uranus" color="blue" />
                </Link>
                <Link href="/planets/neptune">
                  <NavButton icon={<Planet className="mr-2 h-4 w-4" />} label="Neptune" color="blue" />
                </Link>
                <Link href="/">
                  <Button className="cosmic-btn text-white w-full mt-2">Explore Space</Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

function NavButton({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  const colorClasses = {
    blue: "text-blue-300 hover:text-blue-200 hover:bg-blue-950/50",
    orange: "text-orange-300 hover:text-orange-200 hover:bg-orange-950/50",
    yellow: "text-yellow-300 hover:text-yellow-200 hover:bg-yellow-950/50",
    red: "text-red-300 hover:text-red-200 hover:bg-red-950/50",
    gray: "text-gray-300 hover:text-gray-200 hover:bg-gray-800/50",
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="ghost" className={`${colorClasses[color as keyof typeof colorClasses]} w-full justify-start`}>
        {icon}
        {label}
      </Button>
    </motion.div>
  )
}

