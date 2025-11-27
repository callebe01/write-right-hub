import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import SelectableButton from "../SelectableButton";
import { CONSIDERATION_OPTIONS } from "@/data/onboardingOptions";

interface ConsiderationsStepProps {
  childName: string;
  selectedConsiderations: string[];
  onConsiderationsChange: (considerations: string[]) => void;
  onContinue: () => void;
  considerationsError?: string;
}

const ConsiderationsStep = ({
  childName,
  selectedConsiderations,
  onConsiderationsChange,
  onContinue,
  considerationsError,
}: ConsiderationsStepProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customConsideration, setCustomConsideration] = useState("");

  const isValid = selectedConsiderations.length >= 1;

  const handleToggleConsideration = (considerationId: string) => {
    // If "None" is selected, clear all others and only select "None"
    if (considerationId === "none") {
      onConsiderationsChange(["none"]);
      return;
    }

    // If anything else is selected while "None" is active, remove "None"
    const filteredConsiderations = selectedConsiderations.filter((id) => id !== "none");

    if (filteredConsiderations.includes(considerationId)) {
      onConsiderationsChange(filteredConsiderations.filter((id) => id !== considerationId));
    } else {
      onConsiderationsChange([...filteredConsiderations, considerationId]);
    }
  };

  const handleAddCustomConsideration = () => {
    if (customConsideration.trim().length >= 2) {
      const customId = `custom-${Date.now()}`;
      const filteredConsiderations = selectedConsiderations.filter((id) => id !== "none");
      onConsiderationsChange([...filteredConsiderations, customId]);
      setCustomConsideration("");
      setShowCustomInput(false);
    }
  };

  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomConsideration();
    } else if (e.key === "Escape") {
      setShowCustomInput(false);
      setCustomConsideration("");
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
          Are there any special considerations we should know about {childName}?
        </h1>
        <p className="text-gray-600 text-base text-center md:text-left">
          Select all that apply (or "None of the above")
        </p>
      </div>

      {/* Considerations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONSIDERATION_OPTIONS.map((consideration) => (
          <SelectableButton
            key={consideration.id}
            selected={selectedConsiderations.includes(consideration.id)}
            onClick={() => handleToggleConsideration(consideration.id)}
          >
            {consideration.label}
          </SelectableButton>
        ))}

        {/* Custom Consideration Input or Button */}
        {showCustomInput ? (
          <div className="relative">
            <Input
              type="text"
              value={customConsideration}
              onChange={(e) => setCustomConsideration(e.target.value)}
              onKeyDown={handleCustomInputKeyDown}
              onBlur={handleAddCustomConsideration}
              placeholder="Type consideration..."
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
      {considerationsError && (
        <p className="text-sm text-red-600 font-medium">{considerationsError}</p>
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

export default ConsiderationsStep;
