import { motion } from "framer-motion";
import FeatureCard from "../FeatureCard";
import { FEATURE_CARDS } from "@/data/onboardingOptions";

interface HowItWorksStepProps {
  onContinue: () => void;
}

const HowItWorksStep = ({ onContinue }: HowItWorksStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Title */}
      <div>
        <h1 className="font-game text-4xl text-gray-900 text-center md:text-left mb-2">
          How Spark Space Works
        </h1>
        <p className="text-gray-600 text-base text-center md:text-left">
          A game-like experience that makes writing fun and rewarding
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURE_CARDS.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <FeatureCard
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="
            px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide
            transition-all duration-200 min-w-[200px]
            bg-gradient-to-r from-yellow-500 to-yellow-400
            hover:from-yellow-400 hover:to-yellow-300
            text-gray-900 shadow-lg
          "
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HowItWorksStep;
