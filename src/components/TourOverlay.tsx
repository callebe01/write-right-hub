import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useTour } from "@/contexts/TourContext";
import { useNavigate } from "react-router-dom";

const TourOverlay = () => {
  const { isActive, currentFlow, currentStepIndex, nextStep, previousStep, skipTour } = useTour();
  const navigate = useNavigate();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const currentStep = currentFlow?.steps[currentStepIndex];

  useEffect(() => {
    if (!isActive || !currentStep) {
      setTargetRect(null);
      return;
    }

    // Navigate to route if specified
    if (currentStep.route) {
      navigate(currentStep.route);
    }

    // Find and highlight target element
    if (currentStep.target) {
      // Wait for navigation to complete
      const timeout = setTimeout(() => {
        const element = document.querySelector(currentStep.target!);
        if (element) {
          const rect = element.getBoundingClientRect();
          setTargetRect(rect);
          // Scroll element into view
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, currentStep.route ? 300 : 0);

      return () => clearTimeout(timeout);
    } else {
      setTargetRect(null);
    }
  }, [isActive, currentStep, navigate]);

  if (!isActive || !currentFlow || !currentStep) return null;

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === currentFlow.steps.length - 1;

  // Calculate tooltip position based on target
  const getTooltipPosition = () => {
    if (!targetRect) {
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    const placement = currentStep.placement || "bottom";
    const padding = 20;

    switch (placement) {
      case "top":
        return {
          top: `${targetRect.top - padding}px`,
          left: `${targetRect.left + targetRect.width / 2}px`,
          transform: "translate(-50%, -100%)",
        };
      case "bottom":
        return {
          top: `${targetRect.bottom + padding}px`,
          left: `${targetRect.left + targetRect.width / 2}px`,
          transform: "translate(-50%, 0)",
        };
      case "left":
        return {
          top: `${targetRect.top + targetRect.height / 2}px`,
          left: `${targetRect.left - padding}px`,
          transform: "translate(-100%, -50%)",
        };
      case "right":
        return {
          top: `${targetRect.top + targetRect.height / 2}px`,
          left: `${targetRect.right + padding}px`,
          transform: "translate(0, -50%)",
        };
      default:
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100]"
      >
        {/* Backdrop with spotlight */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm">
          {targetRect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bg-transparent"
              style={{
                top: targetRect.top - 8,
                left: targetRect.left - 8,
                width: targetRect.width + 16,
                height: targetRect.height + 16,
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
                borderRadius: "12px",
                border: "3px solid rgb(168, 85, 247)",
              }}
            />
          )}
        </div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute"
          style={getTooltipPosition()}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-4 border-purple-500 rounded-2xl shadow-2xl overflow-hidden max-w-md">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="text-white/80 text-xs font-bold uppercase tracking-wide mb-1">
                  Step {currentStepIndex + 1} of {currentFlow.steps.length}
                </div>
                <h3 className="font-game text-xl text-white uppercase leading-tight">
                  {currentStep.title}
                </h3>
              </div>
              <motion.button
                onClick={skipTour}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-white transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              <p className="text-white/90 leading-relaxed text-base">
                {currentStep.description}
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-black/20 border-t border-purple-500/30 flex items-center justify-between">
              {/* Progress Dots */}
              <div className="flex gap-1.5">
                {currentFlow.steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStepIndex
                        ? "w-6 bg-purple-400"
                        : index < currentStepIndex
                        ? "w-2 bg-purple-600"
                        : "w-2 bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2">
                {!isFirstStep && (
                  <motion.button
                    onClick={previousStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-purple-950/50 border-2 border-purple-500/30 text-white font-bold text-sm hover:border-purple-400 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </motion.button>
                )}
                <motion.button
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-sm shadow-lg flex items-center gap-1"
                >
                  {isLastStep ? (
                    <>
                      Done
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TourOverlay;
