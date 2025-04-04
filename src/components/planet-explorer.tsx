"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

const planets = [
  {
    id: "mercury",
    name: "Mercury",
    color: "#A9A9A9",
    facts: [
      "Mercury is the smallest planet in our solar system!",
      "A day on Mercury is 59 Earth days long.",
      "Mercury has no atmosphere, so it can be very hot during the day and very cold at night.",
      "Mercury is the closest planet to the Sun, orbiting at about 36 million miles away",
    ],
    details: {
      diameter: "3,031 miles",
      distance: "36 million miles from Sun",
      dayLength: "59 Earth days",
      yearLength: "88 Earth days",
      moons: "0",
      temperature: "-290°F to 800°F",
    },
  },
  {
    id: "venus",
    name: "Venus",
    color: "#E6C229",
    facts: [
      "Venus is the hottest planet in our solar system!",
      "Venus spins backward compared to other planets.",
      "A day on Venus is longer than a year on Venus!",
      "Venus is sometimes called Earth's sister planet because they are similar in size.",
    ],
    details: {
      diameter: "7,521 miles",
      distance: "67 million miles from Sun",
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      moons: "0",
      temperature: "880°F (average)",
    },
  },
  {
    id: "earth",
    name: "Earth",
    color: "#4B90E6",
    facts: [
      "Earth is the only planet known to have life!",
      "Earth is the third planet from the Sun.",
      "About 71% of Earth is covered in water.",
      "Earth has one natural satellite – the Moon.",
    ],
    details: {
      diameter: "7,926 miles",
      distance: "93 million miles from Sun",
      dayLength: "24 hours",
      yearLength: "365.25 days",
      moons: "1",
      temperature: "-88°F to 136°F",
    },
  },
  {
    id: "mars",
    name: "Mars",
    color: "#E67F4B",
    facts: [
      "Mars is known as the Red Planet because of its reddish appearance.",
      "Mars has the largest volcano in the solar system called Olympus Mons.",
      "Mars has two small moons named Phobos and Deimos.",
      "Scientists think Mars once had water on its surface!",
    ],
    details: {
      diameter: "4,220 miles",
      distance: "142 million miles from Sun",
      dayLength: "24.6 hours",
      yearLength: "687 Earth days",
      moons: "2",
      temperature: "-195°F to 70°F",
    },
  },
  {
    id: "jupiter",
    name: "Jupiter",
    color: "#E6A54B",
    facts: [
      "Jupiter is the largest planet in our solar system!",
      "Jupiter has a Giant Red Spot, which is actually a huge storm.",
      "Jupiter has at least 79 moons!",
      "Jupiter is a gas giant made mostly of hydrogen and helium.",
    ],
    details: {
      diameter: "86,881 miles",
      distance: "484 million miles from Sun",
      dayLength: "10 hours",
      yearLength: "12 Earth years",
      moons: "79+",
      temperature: "-234°F (cloud top)",
    },
  },
];

export function PlanetExplorer() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[2]); // Earth as default
  const [factIndex, setFactIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const nextFact = () => {
    setFactIndex((prevIndex) =>
      prevIndex < selectedPlanet.facts.length - 1 ? prevIndex + 1 : 0
    );
  };

  const nextPlanet = () => {
    const currentIndex = planets.findIndex((p) => p.id === selectedPlanet.id);
    const nextIndex = (currentIndex + 1) % planets.length;
    setSelectedPlanet(planets[nextIndex]);
    setFactIndex(0);
    setShowDetails(false);
  };

  const prevPlanet = () => {
    const currentIndex = planets.findIndex((p) => p.id === selectedPlanet.id);
    const prevIndex =
      currentIndex === 0 ? planets.length - 1 : currentIndex - 1;
    setSelectedPlanet(planets[prevIndex]);
    setFactIndex(0);
    setShowDetails(false);
  };

  // Auto rotate through facts
  useEffect(() => {
    if (!autoRotate) return;

    const timer = setInterval(() => {
      nextFact();
    }, 8000);

    return () => clearInterval(timer);
  }, [factIndex, selectedPlanet, autoRotate, nextFact]);

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Planet Explorer
        </h2>

        <div className="flex justify-center items-center mb-8 relative">
          <motion.button
            className="absolute left-0 z-10 bg-slate-800/80 rounded-full p-2 text-white"
            onClick={prevPlanet}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <div className="relative h-64 w-64 perspective">
            {planets.map((planet) => (
              <motion.div
                key={planet.id}
                className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center cursor-pointer"
                initial={{
                  scale: planet.id === selectedPlanet.id ? 1 : 0.5,
                  opacity: planet.id === selectedPlanet.id ? 1 : 0.3,
                }}
                animate={{
                  scale: planet.id === selectedPlanet.id ? 1 : 0.5,
                  opacity: planet.id === selectedPlanet.id ? 1 : 0.3,
                  zIndex: planet.id === selectedPlanet.id ? 10 : 1,
                  rotateY:
                    planet.id === selectedPlanet.id && autoRotate
                      ? [0, 360]
                      : 0,
                }}
                transition={{
                  duration: 0.5,
                  rotateY: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
                onClick={() => {
                  if (planet.id !== selectedPlanet.id) {
                    setSelectedPlanet(planet);
                    setFactIndex(0);
                    setShowDetails(false);
                  } else {
                    setAutoRotate(!autoRotate);
                  }
                }}
              >
                <div
                  className={`rounded-full relative ${
                    planet.id === selectedPlanet.id ? "pulse-glow" : ""
                  }`}
                  style={{
                    backgroundColor: planet.color,
                    width: planet.id === selectedPlanet.id ? "180px" : "80px",
                    height: planet.id === selectedPlanet.id ? "180px" : "80px",
                    boxShadow: `0 0 30px ${planet.color}50`,
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
                  </div>
                </div>
                {planet.id === selectedPlanet.id && (
                  <div className="absolute -bottom-8 text-center w-full">
                    <p className="text-lg font-bold text-white">
                      {planet.name}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            className="absolute right-0 z-10 bg-slate-800/80 rounded-full p-2 text-white"
            onClick={nextPlanet}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {showDetails ? (
              <motion.div
                key="details"
                className="bg-slate-800/80 p-4 rounded-lg border border-purple-800/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-purple-300 font-semibold">
                      Diameter:
                    </span>
                    <span className="text-white">
                      {selectedPlanet.details.diameter}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-purple-300 font-semibold">
                      Distance:
                    </span>
                    <span className="text-white">
                      {selectedPlanet.details.distance}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-purple-300 font-semibold">
                      Day Length:
                    </span>
                    <span className="text-white">
                      {selectedPlanet.details.dayLength}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-purple-300 font-semibold">
                      Year Length:
                    </span>
                    <span className="text-white">
                      {selectedPlanet.details.yearLength}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-purple-300 font-semibold">
                      Moons:
                    </span>
                    <span className="text-white">
                      {selectedPlanet.details.moons}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-purple-300 font-semibold">
                      Temperature:
                    </span>
                    <span className="text-white">
                      {selectedPlanet.details.temperature}
                    </span>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button
                    className="text-xs text-blue-300 hover:text-blue-200 transition-colors"
                    onClick={() => setShowDetails(false)}
                  >
                    Show Fun Facts
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-slate-800/80 p-4 rounded-lg border border-purple-800/30 relative"
                key={`${selectedPlanet.id}-${factIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={nextFact}
              >
                <p className="text-center text-white">
                  {selectedPlanet.facts[factIndex]}
                </p>
                <p className="text-center text-xs text-blue-300 mt-2">
                  Click to see another fact!
                </p>

                <motion.button
                  className="absolute top-2 right-2 text-purple-300 hover:text-purple-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Info className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
