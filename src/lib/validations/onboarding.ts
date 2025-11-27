import { z } from "zod";
import { MIN_CHILD_AGE, MAX_CHILD_AGE } from "@/data/onboardingOptions";

// Helper function to calculate age from birthdate
const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
};

// Step 1: Child Info validation
export const childInfoSchema = z.object({
  childName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),

  childBirthdate: z
    .date()
    .max(new Date(), "Birthdate cannot be in the future")
    .refine(
      (date) => {
        const age = calculateAge(date);
        return age >= MIN_CHILD_AGE && age <= MAX_CHILD_AGE;
      },
      {
        message: `Child must be between ${MIN_CHILD_AGE} and ${MAX_CHILD_AGE} years old`,
      }
    ),
});

// Step 2: Interests validation
export const interestsSchema = z.object({
  interests: z
    .array(z.string())
    .min(1, "Please select at least one interest")
    .max(15, "Maximum 15 interests allowed"),

  customInterest: z.string().max(50, "Custom interest is too long").optional(),
});

// Step 3: Skill Level validation
export const skillLevelSchema = z.object({
  skillLevel: z
    .string()
    .min(1, "Please select a skill level"),

  customSkillLevel: z.string().max(200, "Custom description is too long").optional(),
});

// Step 4: Considerations validation
export const considerationsSchema = z.object({
  considerations: z
    .array(z.string())
    .max(10, "Maximum 10 considerations allowed"),

  customConsideration: z.string().max(100, "Custom consideration is too long").optional(),
});

// Step 6: First Challenge validation
export const firstChallengeSchema = z.object({
  firstChallenge: z
    .enum(["homework", "quest-library"], {
      required_error: "Please select how you'd like to get started",
    }),
});

// Combined schema for all onboarding data
export const onboardingSchema = z.object({
  // Step 1
  childName: childInfoSchema.shape.childName,
  childBirthdate: childInfoSchema.shape.childBirthdate,

  // Step 2
  interests: interestsSchema.shape.interests,
  customInterest: interestsSchema.shape.customInterest,

  // Step 3
  skillLevel: skillLevelSchema.shape.skillLevel,
  customSkillLevel: skillLevelSchema.shape.customSkillLevel,

  // Step 4
  considerations: considerationsSchema.shape.considerations,
  customConsideration: considerationsSchema.shape.customConsideration,

  // Step 6
  firstChallenge: firstChallengeSchema.shape.firstChallenge,
});

// TypeScript types derived from schemas
export type ChildInfoData = z.infer<typeof childInfoSchema>;
export type InterestsData = z.infer<typeof interestsSchema>;
export type SkillLevelData = z.infer<typeof skillLevelSchema>;
export type ConsiderationsData = z.infer<typeof considerationsSchema>;
export type FirstChallengeData = z.infer<typeof firstChallengeSchema>;
export type OnboardingData = z.infer<typeof onboardingSchema>;

// LocalStorage data structure
export interface OnboardingStorage {
  version: number;
  timestamp: string;
  currentStep: number;
  completedSteps: number[];
  data: Partial<OnboardingData>;
}
