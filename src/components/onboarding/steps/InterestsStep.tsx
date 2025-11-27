import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import SelectableButton from "../SelectableButton";
import { INTEREST_OPTIONS } from "@/data/onboardingOptions";

interface InterestsStepProps {
  childName: string;
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  onContinue: () => void;
  interestsError?: string;
}

const InterestsStep = ({
  childName,
  selectedInterests,
  onInterestsChange,
  onContinue,
  interestsError,
}: InterestsStepProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInterest, setCustomInterest] = useState("");

  const isValid = selectedInterests.length >= 1;

  const handleToggleInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      onInterestsChange(selectedInterests.filter((id) => id !== interestId));
    } else {
      onInterestsChange([...selectedInterests, interestId]);
    }
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim().length >= 2) {
      const customId = `custom-${Date.now()}`;
      onInterestsChange([...selectedInterests, customId]);
      setCustomInterest("");
      setShowCustomInput(false);
    }
  };

  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomInterest();
    } else if (e.key === "Escape") {
      setShowCustomInput(false);
      setCustomInterest("");
    }
  };

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
          What is {childName} interested in?
        </h1>
        <p className="text-gray-600 text-base text-center md:text-left">
          Select as many as you want
        </p>
      </div>

      {/* Interests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {INTEREST_OPTIONS.map((interest) => (
          <SelectableButton
            key={interest.id}
            selected={selectedInterests.includes(interest.id)}
            onClick={() => handleToggleInterest(interest.id)}
          >
            {interest.label}
          </SelectableButton>
        ))}

        {/* Custom Interest Input or Button */}
        {showCustomInput ? (
          <div className="relative">
            <Input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyDown={handleCustomInputKeyDown}
              onBlur={handleAddCustomInterest}
              placeholder="Type interest..."
              className="h-12 text-base border-2 border-dashed border-gray-300"
              autoFocus
            />
          </div>
        ) : (
          <SelectableButton
            selected={false}
            onClick={() => setShowCustomInput(true)}
            isCustomOption={true}
          >
            + Add Answer
          </SelectableButton>
        )}
      </div>

      {/* Error Message */}
      {interestsError && (
        <p className="text-sm text-red-600 font-medium">{interestsError}</p>
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

export default InterestsStep;
