import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mascotHero from "@/assets/mascot-hero.png";
import mascotCasual from "@/assets/mascot-casual.png";

const AnimatedMascot = () => {
  const [currentMascot, setCurrentMascot] = useState<"hero" | "casual">("hero");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  useEffect(() => {
    // Transformation cycle: hero (2s) → spin+transform (0.6s) → casual (2s) → spin+transform (0.6s) → repeat
    const transformationCycle = setInterval(() => {
      setIsSpinning(true);
      setShowSmoke(true);

      // Change mascot at peak of spin
      setTimeout(() => {
        setCurrentMascot((prev) => (prev === "hero" ? "casual" : "hero"));
      }, 300);

      // End spin and smoke
      setTimeout(() => {
        setIsSpinning(false);
        setShowSmoke(false);
      }, 600);
    }, 4000); // Transform every 4 seconds

    return () => clearInterval(transformationCycle);
  }, []);

  const mascotImage = currentMascot === "hero" ? mascotHero : mascotCasual;

  return (
    <div className="absolute right-[20px] top-[40px] w-[280px] h-[263px] pointer-events-none">
      {/* Smoke/Dust Puff Effects */}
      <AnimatePresence>
        {showSmoke && (
          <>
            {/* Smoke Puff 1 - Top Left */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8, x: 100, y: 80 }}
              animate={{ scale: 2, opacity: 0, x: 60, y: 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute w-16 h-16 rounded-full bg-gray-400/60 blur-md"
            />

            {/* Smoke Puff 2 - Top Right */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8, x: 140, y: 80 }}
              animate={{ scale: 2.2, opacity: 0, x: 180, y: 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="absolute w-20 h-20 rounded-full bg-gray-300/50 blur-md"
            />

            {/* Smoke Puff 3 - Bottom Left */}
            <motion.div
              initial={{ scale: 0, opacity: 0.7, x: 80, y: 180 }}
              animate={{ scale: 1.8, opacity: 0, x: 40, y: 220 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="absolute w-14 h-14 rounded-full bg-gray-400/50 blur-md"
            />

            {/* Smoke Puff 4 - Bottom Right */}
            <motion.div
              initial={{ scale: 0, opacity: 0.7, x: 160, y: 180 }}
              animate={{ scale: 2, opacity: 0, x: 200, y: 220 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="absolute w-16 h-16 rounded-full bg-gray-300/60 blur-md"
            />
          </>
        )}
      </AnimatePresence>

      {/* Mascot with Float + Spin Animation */}
      <motion.img
        key={currentMascot}
        src={mascotImage}
        alt="Spark Space Mascot"
        className="w-full h-full object-contain animate-float"
        animate={{
          rotate: isSpinning ? 720 : 0,
        }}
        transition={{
          rotate: {
            duration: 0.6,
            ease: "easeInOut",
          },
        }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      />
    </div>
  );
};

export default AnimatedMascot;
