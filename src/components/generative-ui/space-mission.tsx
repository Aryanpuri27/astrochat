"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Calendar, Flag, Target } from "lucide-react";
import Image from "next/image";

type SpaceMissionProps = {
  name: string;
  description: string;
  launchDate: string;
  destination: string;
  achievements: string[];
  imageUrl?: string;
};

export function SpaceMission({
  name = "Apollo 11",
  description = "The first manned mission to land on the Moon.",
  launchDate = "July 16, 1969",
  destination = "The Moon",
  achievements = [
    "First humans to land on the Moon",
    "Collected lunar samples",
    "Conducted scientific experiments",
  ],
  imageUrl,
}: Partial<SpaceMissionProps>) {
  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Rocket className="h-6 w-6 text-purple-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">{name}</h3>
            </div>

            <p className="text-white mb-6">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-purple-300">Launch Date</p>
                  <p className="text-white">{launchDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-purple-300">Destination</p>
                  <p className="text-white">{destination}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Flag className="h-5 w-5 text-purple-400" />
                <p className="text-purple-300">Key Achievements</p>
              </div>

              <ul className="space-y-2 pl-7">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="text-white list-disc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {imageUrl && (
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative h-full w-full min-h-[200px] rounded-lg overflow-hidden">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
