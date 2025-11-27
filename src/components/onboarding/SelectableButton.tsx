import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ReactNode } from "react";

interface SelectableButtonProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  isCustomOption?: boolean;
  disabled?: boolean;
}

const SelectableButton = ({
  selected,
  onClick,
  children,
  isCustomOption = false,
  disabled = false,
}: SelectableButtonProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative w-full min-h-[48px] px-5 py-3 rounded-xl text-base font-medium
        transition-all duration-200 flex items-center justify-center gap-2
        ${
          selected
            ? "bg-green-100 border-2 border-green-400 text-green-900"
            : "bg-white border-2 border-gray-300 text-gray-700 hover:border-green-300"
        }
        ${isCustomOption ? "border-dashed italic" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* Selected checkmark */}
      {selected && !isCustomOption && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-shrink-0"
        >
          <Check className="w-5 h-5 text-green-600" />
        </motion.div>
      )}

      {/* Label text */}
      <span className="text-center leading-tight">{children}</span>
    </motion.button>
  );
};

export default SelectableButton;
