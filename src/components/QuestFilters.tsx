import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GRADE_LEVEL_OPTIONS,
  SUBJECT_OPTIONS,
  TYPE_OPTIONS,
} from "@/data/exploreFilters";

interface QuestFiltersProps {
  searchQuery: string;
  gradeLevel: string;
  subject: string;
  type: string;
  onSearchChange: (value: string) => void;
  onGradeLevelChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

const QuestFilters = ({
  searchQuery,
  gradeLevel,
  subject,
  type,
  onSearchChange,
  onGradeLevelChange,
  onSubjectChange,
  onTypeChange,
}: QuestFiltersProps) => {
  return (
    <div className="quest-filters space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search challenges"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-base border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400 bg-white"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Grade Level Filter */}
        <Select value={gradeLevel} onValueChange={onGradeLevelChange}>
          <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400 bg-white">
            <SelectValue placeholder="Grade Level" />
          </SelectTrigger>
          <SelectContent>
            {GRADE_LEVEL_OPTIONS.map((option) => (
              <SelectItem key={option} value={option} className="text-base">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Subject Filter */}
        <Select value={subject} onValueChange={onSubjectChange}>
          <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400 bg-white">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option} className="text-base">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400 bg-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option} className="text-base">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QuestFilters;
