"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type PlanetCardProps = {
  name: string;
  description: string;
  color: string;
  diameter: string;
  distanceFromSun: string;
  dayLength: string;
  yearLength: string;
  temperature: string;
  moons: number;
};

export function PlanetCard({
  name = "Unknown Planet",
  description = "No description available",
  color = "#4B90E6",
  diameter = "Unknown",
  distanceFromSun = "Unknown",
  dayLength = "Unknown",
  yearLength = "Unknown",
  temperature = "Unknown",
  moons = 0,
}: Partial<PlanetCardProps>) {
  return (
    <>
      <Card className="glass overflow-hidden">
        <CardContent className="p-6">
          <motion.div
            className="flex flex-col md:flex-row gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-32 h-32 flex-shrink-0"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 30px ${color}50`,
                }}
              >
                {/* Planet surface details */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2),transparent_40%)]"></div>
                </div>
              </div>
            </motion.div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2" style={{ color }}>
                {name}
              </h3>
              <p className="text-white mb-4">{description}</p>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-purple-300 font-semibold">
                    Diameter:
                  </span>{" "}
                  <span className="text-white">{diameter}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">
                    Distance from Sun:
                  </span>{" "}
                  <span className="text-white">{distanceFromSun}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">
                    Day Length:
                  </span>{" "}
                  <span className="text-white">{dayLength}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">
                    Year Length:
                  </span>{" "}
                  <span className="text-white">{yearLength}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">
                    Temperature:
                  </span>{" "}
                  <span className="text-white">{temperature}</span>
                </div>
                <div>
                  <span className="text-purple-300 font-semibold">Moons:</span>{" "}
                  <span className="text-white">{moons}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </>
  );
}
