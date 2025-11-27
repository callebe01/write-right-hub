import type { Quest } from "@/data/questLibrary";

interface FilterOptions {
  search: string;
  gradeLevel: string;
  subject: string;
  type: string;
}

/**
 * Filters quests based on search query and filter selections
 * @param quests - Array of all available quests
 * @param filters - Current filter selections
 * @returns Filtered array of quests
 */
export function filterQuests(quests: Quest[], filters: FilterOptions): Quest[] {
  return quests.filter((quest) => {
    // Search: match title or description (case-insensitive)
    const searchLower = filters.search.toLowerCase().trim();
    const matchesSearch =
      searchLower === "" ||
      quest.title.toLowerCase().includes(searchLower) ||
      quest.description.toLowerCase().includes(searchLower) ||
      quest.subject.toLowerCase().includes(searchLower);

    // Grade level: exact match or "All Grade Levels"
    const matchesGrade =
      filters.gradeLevel === "All Grade Levels" ||
      quest.gradeLevel === filters.gradeLevel;

    // Subject: exact match or "All Subjects"
    const matchesSubject =
      filters.subject === "All Subjects" || quest.subject === filters.subject;

    // Type: exact match or "Any"
    const matchesType = filters.type === "Any" || quest.type === filters.type;

    return matchesSearch && matchesGrade && matchesSubject && matchesType;
  });
}

/**
 * Debounce function for search input
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
