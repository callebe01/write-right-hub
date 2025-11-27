import { motion } from "framer-motion";
import SelectableButton from "../SelectableButton";

interface FirstChallengeStepProps {
  childName: string;
  firstChallenge: "homework" | "quest-library" | undefined;
  onFirstChallengeChange: (type: "homework" | "quest-library") => void;
  onContinue: () => void;
  firstChallengeError?: string;
}

const FirstChallengeStep = ({
  childName,
  firstChallenge,
  onFirstChallengeChange,
  onContinue,
  firstChallengeError,
}: FirstChallengeStepProps) => {
  const isValid = firstChallenge !== undefined && firstChallenge.length > 0;

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
          What would you like {childName}'s first challenge to be?
        </h1>
        <p className="text-gray-600 text-base text-center md:text-left">
          Choose one to get started
        </p>
      </div>

      {/* Challenge Type Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectableButton
          selected={firstChallenge === "homework"}
          onClick={() => onFirstChallengeChange("homework")}
        >
          <div className="text-left w-full py-2">
            <div className="font-bold text-lg mb-1">Homework</div>
            <div className="text-sm text-gray-600 font-normal">
              {childName} has a writing assignment from school
            </div>
          </div>
        </SelectableButton>

        <SelectableButton
          selected={firstChallenge === "quest-library"}
          onClick={() => onFirstChallengeChange("quest-library")}
        >
          <div className="text-left w-full py-2">
            <div className="font-bold text-lg mb-1">Library</div>
            <div className="text-sm text-gray-600 font-normal">
              Browse our collection of fun writing quests
            </div>
          </div>
        </SelectableButton>
      </div>

      {/* Error Message */}
      {firstChallengeError && (
        <p className="text-sm text-red-600 font-medium">{firstChallengeError}</p>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <motion.button
          onClick={onContinue}
          disabled={!isValid}
          whileHover={{ scale: isValid ? 1.02 : 1 }}
          whileTap={{ scale: isValid ? 0.98 : 1 }}
          animate={isValid ? { scale: [1, 1.02, 1] } : {}}
          transition={isValid ? { repeat: Infinity, duration: 2 } : {}}
          className={`
            px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide
            transition-all duration-200 min-w-[200px]
            ${
              isValid
                ? "bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Complete Setup
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FirstChallengeStep;
