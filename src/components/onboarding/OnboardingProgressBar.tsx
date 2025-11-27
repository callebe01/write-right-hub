import { motion } from "framer-motion";

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgressBar = ({ currentStep, totalSteps }: OnboardingProgressBarProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;
        const isUpcoming = step > currentStep;

        return (
          <motion.div
            key={step}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: step * 0.05,
            }}
            className={`
              h-2 rounded-full transition-all duration-300
              ${isCompleted ? "w-10 bg-green-400" : ""}
              ${isCurrent ? "w-12 bg-yellow-400 animate-pulse" : ""}
              ${isUpcoming ? "w-8 bg-gray-200" : ""}
            `}
          />
        );
      })}
    </div>
  );
};

export default OnboardingProgressBar;
