"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  twinkleSpeed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get particle color based on theme
    const getParticleColor = (alpha: number) => {
      if (resolvedTheme === "dark") {
        return `rgba(16, 185, 129, ${alpha})`; // Green for dark mode
      }
      return `rgba(12, 118, 83, ${alpha})`; // Black for light mode
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles with pixel sizes
    const particleCount = 40;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 3,
      twinkleSpeed: Math.random() * 0.02 + 0.01, // Different twinkle speeds
    }));

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + scrollY,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction - repel particles
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
        }

        // Draw pixel particle (square instead of circle)
        ctx.fillStyle = getParticleColor(0.6 - distance / 1000);
        ctx.fillRect(
          Math.floor(particle.x),
          Math.floor(particle.y),
          particle.size,
          particle.size,
        );

        // Draw pixel-style connections
        particlesRef.current.forEach((otherParticle, j) => {
          if (i === j) return;

          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < 120) {
            ctx.strokeStyle = getParticleColor(0.2 * (1 - dist / 120));
            ctx.lineWidth = 1; // Thicker line for pixel look
            ctx.beginPath();
            ctx.moveTo(Math.floor(particle.x), Math.floor(particle.y));
            ctx.lineTo(
              Math.floor(otherParticle.x + 2),
              Math.floor(otherParticle.y + 2),
            );
            ctx.stroke();
          }
        });

        // Draw line to mouse if close
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);
        if (mouseDistance < 200) {
          ctx.strokeStyle = getParticleColor(0.4 * (1 - mouseDistance / 200));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(Math.floor(particle.x), Math.floor(particle.y));
          ctx.lineTo(
            Math.floor(mouseRef.current.x + 2),
            Math.floor(mouseRef.current.y + 2),
          );
          ctx.stroke();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none w-full h-full"
    />
  );
}
