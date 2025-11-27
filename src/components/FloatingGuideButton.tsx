import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronRight } from "lucide-react";
import { useTour, TourFlow } from "@/contexts/TourContext";

interface FloatingGuideButtonProps {
  flows: TourFlow[];
}

const FloatingGuideButton = ({ flows }: FloatingGuideButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { startTour } = useTour();

  const handleFlowSelect = (flow: TourFlow) => {
    startTour(flow);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full p-4 shadow-2xl border-2 border-purple-400 flex items-center gap-2"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Play className="w-6 h-6 fill-white" />
              <span className="font-bold text-sm pr-1">Designs</span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Flow Selection Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20, y: 20 }}
            className="fixed bottom-24 left-6 z-50 bg-gradient-to-br from-gray-900 to-gray-950 border-4 border-purple-500 rounded-2xl shadow-2xl overflow-hidden"
            style={{ width: "320px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-4">
              <h3 className="font-game text-2xl text-white uppercase">
                Prototype Tours
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Click a flow to start the walkthrough
              </p>
            </div>

            {/* Flow List */}
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {flows.map((flow) => (
                <motion.button
                  key={flow.id}
                  onClick={() => handleFlowSelect(flow)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-950/30 hover:bg-purple-900/40 border-2 border-purple-500/30 hover:border-purple-400 rounded-xl p-4 text-left transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-base mb-1">
                        {flow.name}
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {flow.description}
                      </p>
                      <div className="mt-2 text-purple-300 text-xs font-medium">
                        {flow.steps.length} steps
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0 ml-2" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingGuideButton;
