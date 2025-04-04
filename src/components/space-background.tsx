"use client";

import { useEffect, useRef } from "react";

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      // Remove setDimensions call since it's not defined and not necessary
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create stars
    const stars: {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }[] = [];

    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.05,
        opacity: Math.random(),
        twinkleSpeed: 0.01 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Create nebulas
    const nebulas: {
      x: number;
      y: number;
      radius: number;
      color: string;
      opacity: number;
    }[] = [];

    const colors = [
      "rgba(147, 51, 234, 0.1)", // Purple
      "rgba(59, 130, 246, 0.1)", // Blue
      "rgba(236, 72, 153, 0.1)", // Pink
      "rgba(16, 185, 129, 0.1)", // Green
    ];

    for (let i = 0; i < 5; i++) {
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 100 + Math.random() * 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.1 + Math.random() * 0.2,
      });
    }

    // Create shooting stars
    const shootingStars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      active: boolean;
      timeToNext: number;
    }[] = [];

    for (let i = 0; i < 5; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3),
        length: 50 + Math.random() * 100,
        speed: 5 + Math.random() * 10,
        angle: Math.PI / 4 + (Math.random() * Math.PI) / 4,
        active: false,
        timeToNext: Math.random() * 200,
      });
    }

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f172a"); // Dark blue
      gradient.addColorStop(0.5, "#1e1b4b"); // Dark purple
      gradient.addColorStop(1, "#0f172a"); // Dark blue

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulas
      nebulas.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        gradient.addColorStop(0, nebula.color.replace("0.1", "0.3"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stars
      stars.forEach((star) => {
        // Update twinkle phase
        star.twinklePhase += star.twinkleSpeed;
        if (star.twinklePhase > Math.PI * 2) star.twinklePhase = 0;

        // Calculate current opacity based on twinkle phase
        const currentOpacity = 0.3 + Math.sin(star.twinklePhase) * 0.7;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Move stars
        star.y += star.speed;

        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw shooting stars
      shootingStars.forEach((star) => {
        if (star.active) {
          // Draw the shooting star
          ctx.beginPath();
          const tailX = star.x - Math.cos(star.angle) * star.length;
          const tailY = star.y - Math.sin(star.angle) * star.length;

          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            tailX,
            tailY
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Move the shooting star
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;

          // Check if off screen
          if (star.x > canvas.width || star.y > canvas.height) {
            star.active = false;
            star.timeToNext = 50 + Math.random() * 200;
          }
        } else {
          // Countdown to next activation
          star.timeToNext--;
          if (star.timeToNext <= 0) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * (canvas.height / 3);
            star.angle = Math.PI / 4 + (Math.random() * Math.PI) / 4;
            star.active = true;
          }
        }
      });

      // Occasionally add a pulsing star
      if (frameCount % 100 === 0) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.stroke();
      }

      frameCount++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-purple-950/20 pointer-events-none" />
    </>
  );
}
