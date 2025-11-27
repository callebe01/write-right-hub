import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, SkipForward } from "lucide-react";
import mascotImage from "@/assets/mascot-casual.png";
import type { GuidanceStep } from "@/hooks/useExploreGuidance";

interface MascotGuideProps {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onClose: () => void;
  currentGuidanceStep?: GuidanceStep & { message: string };
}

const MascotGuide = ({
  isActive,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onClose,
  currentGuidanceStep,
}: MascotGuideProps) => {
  if (!isActive || !currentGuidanceStep) return null;

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed md:left-8 lg:left-16 top-24 md:top-32 z-50
                   w-full md:w-[280px] max-w-[calc(100vw-2rem)] mx-4 md:mx-0
                   bg-gradient-to-br from-white to-gray-50
                   rounded-2xl border-2 border-gray-200 shadow-xl
                   overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close guide"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Mascot Avatar */}
        <div className="flex justify-center pt-6 pb-4">
          <motion.img
            src={mascotImage}
            alt="Sage the mascot"
            className="w-32 h-auto object-contain animate-float"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index + 1 === currentStep
                    ? "w-8 bg-yellow-400"
                    : index + 1 < currentStep
                    ? "w-6 bg-green-400"
                    : "w-4 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Step Counter */}
          <p className="text-center text-sm font-medium text-gray-500">
            Step {currentStep} of {totalSteps}
          </p>

          {/* Guidance Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
            >
              <p className="text-[15px] text-gray-700 leading-relaxed font-body">
                {currentGuidanceStep.message}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-2 pt-2">
            {/* Previous Button */}
            <button
              onClick={onPrevious}
              disabled={isFirstStep}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isFirstStep
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {/* Skip Button */}
            <button
              onClick={onSkip}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </button>

            {/* Next/Complete Button */}
            <button
              onClick={onNext}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold transition-all
                         bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300
                         text-gray-900 shadow-md hover:shadow-lg"
            >
              {isLastStep ? "Complete" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MascotGuide;
