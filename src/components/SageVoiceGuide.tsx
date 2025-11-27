import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, PhoneOff, ChevronUp } from "lucide-react";
import { useSageVoiceGuide } from "@/hooks/useSageVoiceGuide";
import callAvatar from "@/assets/call.png";

interface SageVoiceGuideProps {
  searchQuery: string;
  gradeLevel: string;
  subject: string;
  type: string;
  questCount: number;
  hoveredQuestId: number | null;
}

const SageVoiceGuide = (props: SageVoiceGuideProps) => {
  const {
    isExpanded,
    isMuted,
    currentHint,
    toggleMute,
    toggleExpanded,
    resetInteraction,
  } = useSageVoiceGuide(props);

  return (
    <>
      {/* Desktop Version */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:block fixed left-8 top-[140px] z-40 w-[224px]"
        onClick={resetInteraction}
      >
        {/* Friendly Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <h2 className="font-game text-xl text-gray-900 leading-tight">
            Hey, let me
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-400">
              help you!
            </span>
          </h2>
        </motion.div>

        {/* Sage Avatar */}
        <div className="relative flex justify-center py-4">
          {/* Avatar with Float Animation */}
          <motion.img
            src={callAvatar}
            alt="Sage"
            className="relative w-28 h-28 object-contain z-10"
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

        {/* Contextual Hint */}
        <div className="px-4 pb-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHint}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <p className="text-xs text-gray-700 leading-relaxed font-body text-center">
                {currentHint}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Control Buttons */}
        <div className="px-4 pb-4 flex items-center justify-center gap-3">
          {/* Mic Button */}
          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              isMuted
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-white" />
            )}
          </motion.button>

          {/* End Call Button (visual only) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            aria-label="End call (visual only)"
          >
            <PhoneOff className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Version - Bottom Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40
                   w-[calc(100vw-32px)] max-w-[380px]"
      >
        <motion.div
          animate={{ height: isExpanded ? "380px" : "80px" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {/* Collapsed View - Always Visible */}
          <button
            onClick={toggleExpanded}
            className="w-full px-4 py-4 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {/* Small Avatar */}
              <img
                src={callAvatar}
                alt="Sage"
                className="w-12 h-12 object-contain"
              />
              <div className="text-left">
                <span className="text-sm font-bold text-gray-900">
                  Sage Assistant
                </span>
                <span className="text-xs text-gray-500 block">Tap to expand</span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronUp className="w-5 h-5 text-gray-500" />
            </motion.div>
          </button>

          {/* Expanded Content */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="px-4 pb-4"
              onClick={resetInteraction}
            >
              {/* Friendly Title */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center pt-2 pb-1"
              >
                <h2 className="font-game text-lg text-gray-900 leading-tight">
                  Hey, let me{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-400">
                    help you!
                  </span>
                </h2>
              </motion.div>

              {/* Large Avatar */}
              <div className="flex justify-center py-3">
                <motion.img
                  src={callAvatar}
                  alt="Sage"
                  className="w-32 h-32 object-contain"
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

              {/* Contextual Hint */}
              <div className="pb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHint}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-gray-700 leading-relaxed font-body text-center">
                      {currentHint}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4">
                {/* Mic Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isMuted
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-700 hover:bg-gray-800"
                  }`}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <MicOff className="w-5 h-5 text-white" />
                  ) : (
                    <Mic className="w-5 h-5 text-white" />
                  )}
                </motion.button>

                {/* End Call Button (visual only) */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                  aria-label="End call (visual only)"
                >
                  <PhoneOff className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default SageVoiceGuide;
