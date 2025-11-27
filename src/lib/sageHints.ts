export interface HintContext {
  searchQuery: string;
  gradeLevel: string;
  subject: string;
  type: string;
  questCount: number;
  hoveredQuestId: number | null;
  hasSeenFirstVisit: boolean;
}

export interface Hint {
  id: string;
  priority: number;
  message: string;
  condition: (context: HintContext) => boolean;
}

// Define all available hints with their priorities and conditions
export const HINTS: Hint[] = [
  {
    id: "first-visit",
    priority: 100,
    message: "Hey! I'm Sage, your writing buddy. I'm here to help you find the perfect quest for your adventure!",
    condition: (ctx) => !ctx.hasSeenFirstVisit,
  },
  {
    id: "no-results",
    priority: 90,
    message: "Hmm, no quests match those filters. Try adjusting them or search for something else!",
    condition: (ctx) => ctx.questCount === 0,
  },
  {
    id: "searching",
    priority: 80,
    message: "Looking for '{query}'... Let me help you find the perfect match!",
    condition: (ctx) => ctx.searchQuery.length > 0,
  },
  {
    id: "filtered-grade",
    priority: 70,
    message: "Found {count} quests for {grade}! Pick one that looks exciting.",
    condition: (ctx) =>
      ctx.gradeLevel !== "All Grade Levels" && ctx.questCount > 0,
  },
  {
    id: "filtered-subject",
    priority: 70,
    message: "{subject} is awesome! I found {count} quests for you.",
    condition: (ctx) => ctx.subject !== "All Subjects" && ctx.questCount > 0,
  },
  {
    id: "quest-hover",
    priority: 60,
    message: "This looks fun! Click to see the full details and start your quest.",
    condition: (ctx) => ctx.hoveredQuestId !== null,
  },
  {
    id: "many-results",
    priority: 50,
    message: "Wow! {count} quests to choose from. Use the filters above to narrow it down!",
    condition: (ctx) => ctx.questCount > 9,
  },
  {
    id: "idle",
    priority: 1,
    message: "I'm here to help! Use the filters above to find the perfect writing quest.",
    condition: () => true, // Always true - fallback
  },
];

/**
 * Selects the highest priority hint where the condition is true
 */
export function selectHint(context: HintContext): Hint {
  // Find the first hint (sorted by priority descending) where condition is true
  const matchingHints = HINTS.filter((hint) => hint.condition(context)).sort(
    (a, b) => b.priority - a.priority
  );

  // Return the highest priority matching hint (should always have at least the fallback)
  return matchingHints[0];
}

/**
 * Formats a hint message by replacing template variables
 */
export function formatHintMessage(hint: Hint, context: HintContext): string {
  let message = hint.message;

  // Replace {query}
  message = message.replace("{query}", context.searchQuery);

  // Replace {count}
  message = message.replace("{count}", context.questCount.toString());

  // Replace {grade}
  message = message.replace("{grade}", context.gradeLevel);

  // Replace {subject}
  message = message.replace("{subject}", context.subject);

  return message;
}

/**
 * Gets the complete formatted hint for a given context
 */
export function getFormattedHint(context: HintContext): string {
  const hint = selectHint(context);
  return formatHintMessage(hint, context);
}
