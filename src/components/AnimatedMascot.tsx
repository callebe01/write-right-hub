import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mascotHero from "@/assets/mascot-hero.png";
import mascotCasual from "@/assets/mascot-casual.png";

const AnimatedMascot = () => {
  const [currentMascot, setCurrentMascot] = useState<"hero" | "casual">("hero");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  useEffect(() => {
    // Transformation cycle: hero (5.4s) → spin+transform (0.6s) → casual (5.4s) → spin+transform (0.6s) → repeat
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
    }, 12000); // Transform every 12 seconds

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

            {/* Dust swirl around the base */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0.7 }}
              animate={{ scale: 1.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute left-1/2 bottom-6 -translate-x-1/2 w-48 h-48 rounded-full border-4 border-yellow-100/80 blur-lg"
            />
            <motion.div
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="absolute left-1/2 bottom-4 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-emerald-200/80 blur-md"
            />
          </>
        )}
      </AnimatePresence>

      {/* Speed lines while Sage spins */}
      <AnimatePresence>
        {isSpinning && (
          <>
            <motion.div
              key="speedline-left"
              initial={{ opacity: 0, x: 40, y: 60, scaleY: 0 }}
              animate={{ opacity: 0.6, x: -10, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-0 top-24 h-16 w-3 rounded-full bg-white/70 blur-sm"
            />
            <motion.div
              key="speedline-right"
              initial={{ opacity: 0, x: 220, y: 80, scaleY: 0 }}
              animate={{ opacity: 0.6, x: 260, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
              className="absolute right-0 top-16 h-20 w-3 rounded-full bg-yellow-100/80 blur-sm"
            />
          </>
        )}
      </AnimatePresence>

      {/* Mascot with Float + Spin Animation */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          <motion.img
            key={currentMascot}
            src={mascotImage}
            alt="Spark Space Mascot"
            className="w-full h-full object-contain animate-float absolute inset-0"
            animate={{
              rotate: isSpinning ? 720 : 0,
              opacity: 1,
              scale: isSpinning ? 1.05 : 1,
              filter: isSpinning ? "blur(0.5px) brightness(1.1)" : "none",
            }}
            transition={{
              rotate: {
                duration: 0.6,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.2,
              },
              scale: {
                duration: 0.2,
              },
              filter: {
                duration: 0.2,
              },
            }}
            initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
            exit={{ opacity: 0, scale: 0.9 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedMascot;
