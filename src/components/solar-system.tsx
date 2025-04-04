"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, Info } from "lucide-react";
import Link from "next/link";

const planets = [
  {
    id: "mercury",
    name: "Mercury",
    color: "#A9A9A9",
    size: 3.8,
    orbitRadius: 50,
    orbitSpeed: 8,
    orbitColor: "rgba(169, 169, 169, 0.3)",
  },
  {
    id: "venus",
    name: "Venus",
    color: "#E6C229",
    size: 9.5,
    orbitRadius: 75,
    orbitSpeed: 12,
    orbitColor: "rgba(230, 194, 41, 0.3)",
  },
  {
    id: "earth",
    name: "Earth",
    color: "#4B90E6",
    size: 10,
    orbitRadius: 100,
    orbitSpeed: 16,
    orbitColor: "rgba(75, 144, 230, 0.3)",
  },
  {
    id: "mars",
    name: "Mars",
    color: "#E67F4B",
    size: 5.3,
    orbitRadius: 125,
    orbitSpeed: 20,
    orbitColor: "rgba(230, 127, 75, 0.3)",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    color: "#E6A54B",
    size: 20,
    orbitRadius: 170,
    orbitSpeed: 30,
    orbitColor: "rgba(230, 165, 75, 0.3)",
  },
  {
    id: "saturn",
    name: "Saturn",
    color: "#EAD6A6",
    size: 17,
    orbitRadius: 210,
    orbitSpeed: 35,
    orbitColor: "rgba(234, 214, 166, 0.3)",
  },
  {
    id: "uranus",
    name: "Uranus",
    color: "#73C2FB",
    size: 14,
    orbitRadius: 250,
    orbitSpeed: 40,
    orbitColor: "rgba(115, 194, 251, 0.3)",
  },
  {
    id: "neptune",
    name: "Neptune",
    color: "#3E66F9",
    size: 13.5,
    orbitRadius: 290,
    orbitSpeed: 45,
    orbitColor: "rgba(62, 102, 249, 0.3)",
  },
];

export function SolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedFactor, setSpeedFactor] = useState(1);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] w-full overflow-hidden rounded-xl glass"
    >
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4 bg-slate-900/70 p-3 rounded-lg backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white hover:bg-purple-900/50"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>

        <div className="w-32">
          <p className="text-xs text-purple-300 mb-1">
            Speed: {speedFactor.toFixed(1)}x
          </p>
          <Slider
            value={[speedFactor]}
            min={0.1}
            max={3}
            step={0.1}
            onValueChange={(value) => setSpeedFactor(value[0])}
          />
        </div>
      </div>

      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          className="rounded-full bg-yellow-500"
          style={{
            width: "40px",
            height: "40px",
            boxShadow: "0 0 40px #f59e0b, 0 0 80px #f59e0b50",
          }}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 40px #f59e0b, 0 0 80px #f59e0b50",
              "0 0 50px #f59e0b, 0 0 100px #f59e0b60",
              "0 0 40px #f59e0b, 0 0 80px #f59e0b50",
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
      {planets.map((planet) => (
        <div
          key={planet.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Orbit */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${planet.orbitRadius * 2}px`,
              height: `${planet.orbitRadius * 2}px`,
              borderColor: planet.orbitColor,
            }}
          />

          {/* Planet */}
          <motion.div
            className="absolute orbit"
            style={{
              width: `${planet.size * 2}px`,
              height: `${planet.size * 2}px`,
              x: -planet.size,
              y: -planet.size,
              ["--orbit-radius" as string]: `${planet.orbitRadius}px`,
              ["--orbit-speed" as string]: `${
                planet.orbitSpeed / speedFactor
              }s`,
            }}
            animate={
              isPlaying
                ? {
                    rotate: [0, 360],
                  }
                : {}
            }
            transition={{
              duration: planet.orbitSpeed / speedFactor,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatType: "loop",
            }}
            // className="orbit"
          >
            <Link href={`/planets/${planet.id}`}>
              <motion.div
                className="rounded-full planet-hover cursor-pointer"
                style={{
                  backgroundColor: planet.color,
                  width: `${planet.size * 2}px`,
                  height: `${planet.size * 2}px`,
                  boxShadow: `0 0 10px ${planet.color}50`,
                }}
                whileHover={{
                  scale: 1.2,
                  boxShadow: `0 0 20px ${planet.color}80`,
                }}
                onHoverStart={() => setHoveredPlanet(planet.id)}
                onHoverEnd={() => setHoveredPlanet(null)}
              />
            </Link>
          </motion.div>
        </div>
      ))}

      {/* Planet info tooltip */}
      <AnimatePresence>
        {hoveredPlanet && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg z-20"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: planets.find((p) => p.id === hoveredPlanet)
                    ?.color,
                }}
              />
              <p className="font-medium">
                {planets.find((p) => p.id === hoveredPlanet)?.name}
              </p>
              <Link
                href={`/planets/${hoveredPlanet}`}
                className="text-xs text-purple-300 flex items-center gap-1"
              >
                <Info className="h-3 w-3" /> View Details
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
