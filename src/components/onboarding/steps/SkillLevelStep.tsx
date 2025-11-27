import { motion } from "framer-motion";
import SelectableButton from "../SelectableButton";
import { SKILL_LEVEL_OPTIONS } from "@/data/onboardingOptions";

interface SkillLevelStepProps {
  childName: string;
  skillLevel: string | undefined;
  onSkillLevelChange: (level: string) => void;
  onContinue: () => void;
  skillLevelError?: string;
}

const SkillLevelStep = ({
  childName,
  skillLevel,
  onSkillLevelChange,
  onContinue,
  skillLevelError,
}: SkillLevelStepProps) => {
  const isValid = skillLevel !== undefined && skillLevel.length > 0;

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
          What is {childName}'s writing skill level?
        </h1>
        <p className="text-gray-600 text-base text-center md:text-left">
          Select one that best describes their current abilities
        </p>
      </div>

      {/* Skill Level Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SKILL_LEVEL_OPTIONS.map((option) => (
          <SelectableButton
            key={option.id}
            selected={skillLevel === option.id}
            onClick={() => onSkillLevelChange(option.id)}
          >
            {option.label}
          </SelectableButton>
        ))}
      </div>

      {/* Error Message */}
      {skillLevelError && (
        <p className="text-sm text-red-600 font-medium">{skillLevelError}</p>
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
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SkillLevelStep;
