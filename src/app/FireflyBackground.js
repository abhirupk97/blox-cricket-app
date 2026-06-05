"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function FireflyBackground() {
  const particlesInit = useCallback(async (engine) => {
    // Loads the ultra-lightweight slim version of the particle engine
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: "transparent" }, // Keeps your video visible!
        },
        fpsLimit: 60,
        particles: {
          color: { value: "#39FF14" }, // Your signature Neon Green
          move: {
            direction: "top", // Sparks slowly float upwards
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.8, // Buttery slow movement
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 40, // 40 fireflies on screen at once
          },
          opacity: {
            animation: { enable: true, speed: 1, minimumValue: 0.1 },
            value: { min: 0.1, max: 0.8 }, // Creates a twinkling/fading effect
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 }, // Very small, subtle sparks
          },
        },
        detectRetina: true,
      }}
    />
  );
}