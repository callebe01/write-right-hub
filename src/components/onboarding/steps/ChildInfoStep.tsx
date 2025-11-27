import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ChildInfoStepProps {
  childName: string;
  childBirthdate: Date | undefined;
  onNameChange: (name: string) => void;
  onBirthdateChange: (date: Date | undefined) => void;
  onContinue: () => void;
  nameError?: string;
  birthdateError?: string;
}

const ChildInfoStep = ({
  childName,
  childBirthdate,
  onNameChange,
  onBirthdateChange,
  onContinue,
  nameError,
  birthdateError,
}: ChildInfoStepProps) => {
  const isValid = childName.trim().length >= 2 && childBirthdate !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Title */}
      <h1 className="font-game text-4xl text-gray-900 text-center md:text-left">
        What is your child's first name and date of birth
      </h1>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="child-name" className="text-base font-medium text-gray-700">
            First name
          </Label>
          <Input
            id="child-name"
            type="text"
            value={childName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter name"
            className={`h-12 text-base ${nameError ? "border-red-400 focus:ring-red-400" : ""}`}
          />
          {nameError && (
            <p className="text-sm text-red-600 font-medium">{nameError}</p>
          )}
        </div>

        {/* Birthdate */}
        <div className="space-y-2">
          <Label htmlFor="child-birthdate" className="text-base font-medium text-gray-700">
            Birthdate
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="child-birthdate"
                variant="outline"
                className={`w-full h-12 justify-start text-left font-normal text-base ${
                  !childBirthdate ? "text-muted-foreground" : ""
                } ${birthdateError ? "border-red-400" : ""}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {childBirthdate ? format(childBirthdate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={childBirthdate}
                onSelect={onBirthdateChange}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={2006}
                toYear={2020}
              />
            </PopoverContent>
          </Popover>
          {birthdateError && (
            <p className="text-sm text-red-600 font-medium">{birthdateError}</p>
          )}
        </div>
      </div>

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

export default ChildInfoStep;
