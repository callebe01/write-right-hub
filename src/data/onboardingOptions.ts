// Parent Onboarding Data Constants
// Options for interests, skill levels, and special considerations

export interface InterestOption {
  id: string;
  label: string;
}

export interface SkillLevelOption {
  id: string;
  label: string;
  description: string;
}

export interface ConsiderationOption {
  id: string;
  label: string;
}

export const INTEREST_OPTIONS: InterestOption[] = [
  { id: "roblox", label: "Roblox" },
  { id: "minecraft", label: "Minecraft" },
  { id: "lego", label: "LEGO" },
  { id: "pokemon", label: "Pokemon" },
  { id: "soccer", label: "Soccer" },
  { id: "mariokart", label: "MarioKart" },
  { id: "gymnastics", label: "Gymnastics" },
  { id: "wimpy-kid", label: "Diary of a Wimpy Kid" },
  { id: "fortnite", label: "Fortnite" },
  { id: "art", label: "Art" },
];

export const SKILL_LEVEL_OPTIONS: SkillLevelOption[] = [
  {
    id: "struggling",
    label: "Struggling with writing and falling behind",
    description: "Child needs additional support and foundational skill building",
  },
  {
    id: "on-grade-level",
    label: "On grade level but could use more practice",
    description: "Child is meeting expectations but needs reinforcement",
  },
  {
    id: "ahead",
    label: "Ahead in writing and needs to be challenged",
    description: "Child excels and requires advanced material",
  },
  {
    id: "confidence",
    label: "I want my child to be more confident in writing",
    description: "Child has the skills but lacks confidence or motivation",
  },
];

export const CONSIDERATION_OPTIONS: ConsiderationOption[] = [
  { id: "adhd", label: "ADHD" },
  { id: "dyslexia", label: "Dyslexia" },
  { id: "esl", label: "ESL" },
  { id: "behavioral", label: "Behavioral" },
  { id: "speech", label: "Speech" },
  { id: "autism", label: "Autism Spectrum" },
  { id: "special-ed", label: "Special Ed" },
  { id: "gifted", label: "Gifted & Talented" },
  { id: "none", label: "None" },
];

export const FEATURE_CARDS = [
  {
    id: "rewards",
    title: "Rewards for writing practice",
    description: "Your child earns coins for completing writing quests, creating positive reinforcement and building a writing habit.",
    icon: "coin" as const,
  },
  {
    id: "coaching",
    title: "Coaching without cheating",
    description: "Sage, our AI tutor, guides your child through the writing process without giving them the answers.",
    icon: "sparkles" as const,
  },
  {
    id: "homework",
    title: "Homework help or quests",
    description: "Turn any school assignment into a quest, or choose from our curated library of writing challenges.",
    icon: "book" as const,
  },
  {
    id: "progress",
    title: "Progress reports",
    description: "Track your child's growth with detailed insights into their writing improvement over time.",
    icon: "chart" as const,
  },
];

// Helper function to check if an interest/consideration is the "custom" option
export const isCustomOption = (id: string): boolean => {
  return id === "custom";
};

// Validate age range for child (5-18 years old)
export const MIN_CHILD_AGE = 5;
export const MAX_CHILD_AGE = 18;

// LocalStorage expiry (7 days)
export const ONBOARDING_EXPIRY_DAYS = 7;
