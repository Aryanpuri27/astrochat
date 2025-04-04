"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Star = {
  name?: string;
  magnitude?: number;
  coordinates?: {
    ra: string;
    dec: string;
  };
  x?: number;
  y?: number;
  size?: number;
  brightness?: number;
};

type ConstellationLine = {
  from: number;
  to: number;
};

type ConstellationMapProps = {
  constellation: string;
  stars: Star[];
  description?: string;
  lines?: ConstellationLine[];
};

// Default constellation (Big Dipper)
const defaultStars: Star[] = [
  { x: 50, y: 50, size: 2, brightness: 0.8, name: "Star 1", magnitude: 2 },
  { x: 100, y: 60, size: 3, brightness: 0.9, name: "Star 2", magnitude: 1 },
  { x: 150, y: 70, size: 2, brightness: 0.7, name: "Star 3", magnitude: 3 },
  { x: 200, y: 90, size: 2.5, brightness: 0.8, name: "Star 4", magnitude: 2 },
  { x: 220, y: 140, size: 2, brightness: 0.7, name: "Star 5", magnitude: 3 },
  { x: 260, y: 180, size: 3, brightness: 0.9, name: "Star 6", magnitude: 1 },
  { x: 300, y: 200, size: 2.5, brightness: 0.8, name: "Star 7", magnitude: 2 },
];

const defaultLines: ConstellationLine[] = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
];

export function ConstellationMap({
  constellation,
  stars = defaultStars,
  description = "A beautiful constellation in the night sky.",
  lines = defaultLines,
}: ConstellationMapProps) {
  // Convert astronomical coordinates to canvas coordinates
  const processedStars = stars.map((star, index) => {
    if (star.coordinates) {
      // Simple conversion of RA/Dec to x/y coordinates
      // This is a basic implementation - could be enhanced with proper astronomical calculations
      const ra = parseFloat(star.coordinates.ra.split("h")[0]) * 30; // Convert hours to degrees
      const dec = parseFloat(star.coordinates.dec.split("°")[0]);

      if (isNaN(ra) || isNaN(dec)) {
        return defaultStars[index] || star; // Fallback to default star or original
      }

      return {
        ...star,
        x: (ra / 24) * 300 + 50, // Scale RA to canvas width
        y: ((90 - dec) / 180) * 300 + 50, // Scale Dec to canvas height
        size: star.magnitude ? (6 - star.magnitude) * 1.5 : 2, // Brighter stars (lower magnitude) appear larger
        brightness: star.magnitude
          ? Math.max(0.3, 1 - star.magnitude / 6)
          : 0.8, // Brighter stars have higher opacity
      };
    }
    // If no coordinates provided, use the existing x, y values
    return star;
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw small background stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 1;
      const opacity = Math.random() * 0.5 + 0.1;

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw constellation lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;

    lines.forEach((line) => {
      const fromStar = processedStars[line.from];
      const toStar = processedStars[line.to];

      if (fromStar?.x && toStar?.x && fromStar?.y && toStar?.y) {
        ctx.beginPath();
        ctx.moveTo(fromStar.x, fromStar.y);
        ctx.lineTo(toStar.x, toStar.y);
        ctx.stroke();
      }
    });

    // Draw stars
    stars.forEach((star) => {
      // Validate star coordinates and properties
      if (
        typeof star.x !== "number" ||
        typeof star.y !== "number" ||
        !isFinite(star.x) ||
        !isFinite(star.y) ||
        typeof star.size !== "number" ||
        !isFinite(star.size)
      ) {
        return; // Skip invalid stars
      }

      // Star glow
      const gradient = ctx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        star.size * 4
      );
      gradient.addColorStop(
        0,
        `rgba(255, 255, 255, ${star.brightness || 0.8})`
      );
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
      ctx.fill();

      // Star core
      ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [stars, lines, processedStars]);

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-center mb-2 text-white">
          {constellation}
        </h3>
        <p className="text-center text-white mb-6">{description}</p>

        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
}
