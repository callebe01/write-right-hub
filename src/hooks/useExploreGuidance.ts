import { useState, useEffect, useCallback } from "react";
import { useOnboardingStorage } from "./useOnboardingStorage";

const STORAGE_KEY = "explore-guidance-seen";

interface ExploreGuidanceState {
  isActive: boolean;
  currentStep: number;
  hasSeenGuidance: boolean;
  isFirstVisitAfterOnboarding: boolean;
}

export interface GuidanceStep {
  id: string;
  message: string;
  targetElement?: string;
  action?: "highlight-filters" | "highlight-card" | "highlight-search";
}

export const GUIDANCE_STEPS: GuidanceStep[] = [
  {
    id: "welcome",
    message: "Welcome! Let's find the perfect writing assignment for your child. I'll show you around the quest library.",
    targetElement: undefined,
    action: undefined,
  },
  {
    id: "filters",
    message: "Use these filters to find assignments by grade level, subject, or type. Try searching for topics your child loves!",
    targetElement: ".quest-filters",
    action: "highlight-filters",
  },
  {
    id: "quest-card",
    message: "Each quest card shows the assignment details, difficulty, word count, and coin rewards. Hover to see more!",
    targetElement: ".assignment-card",
    action: "highlight-card",
  },
  {
    id: "selection",
    message: "Click on any quest card to see the full instructions and get your child started on their writing journey!",
    targetElement: ".assignment-card",
    action: "highlight-card",
  },
];

export function useExploreGuidance() {
  const { currentStep: onboardingStep, data: onboardingData } = useOnboardingStorage();

  const [state, setState] = useState<ExploreGuidanceState>({
    isActive: false,
    currentStep: 1,
    hasSeenGuidance: false,
    isFirstVisitAfterOnboarding: false,
  });

  // Check localStorage and onboarding status on mount
  useEffect(() => {
    const hasSeenGuidance = localStorage.getItem(STORAGE_KEY) === "true";
    const onboardingCompleted = onboardingStep >= 7;
    const isFirstVisit = !hasSeenGuidance && onboardingCompleted;

    setState((prev) => ({
      ...prev,
      hasSeenGuidance,
      isFirstVisitAfterOnboarding: isFirstVisit,
      isActive: isFirstVisit, // Auto-activate if first visit after onboarding
    }));
  }, [onboardingStep]);

  const startGuidance = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: true,
      currentStep: 1,
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      const nextStepNum = prev.currentStep + 1;
      if (nextStepNum > GUIDANCE_STEPS.length) {
        // Guidance completed
        localStorage.setItem(STORAGE_KEY, "true");
        return {
          ...prev,
          isActive: false,
          hasSeenGuidance: true,
          currentStep: 1,
        };
      }
      return {
        ...prev,
        currentStep: nextStepNum,
      };
    });
  }, []);

  const previousStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1),
    }));
  }, []);

  const skipGuidance = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setState((prev) => ({
      ...prev,
      isActive: false,
      hasSeenGuidance: true,
      currentStep: 1,
    }));
  }, []);

  const closeGuidance = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  const reopenGuidance = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: true,
      currentStep: 1,
    }));
  }, []);

  // Get child name from onboarding data for personalized messages
  const childName = onboardingData?.childName || "your child";

  // Get current step with personalized message
  const currentGuidanceStep = GUIDANCE_STEPS[state.currentStep - 1];
  const personalizedMessage = currentGuidanceStep?.message.replace(
    "your child",
    childName
  );

  return {
    isActive: state.isActive,
    currentStep: state.currentStep,
    totalSteps: GUIDANCE_STEPS.length,
    hasSeenGuidance: state.hasSeenGuidance,
    isFirstVisitAfterOnboarding: state.isFirstVisitAfterOnboarding,
    startGuidance,
    nextStep,
    previousStep,
    skipGuidance,
    closeGuidance,
    reopenGuidance,
    guidanceSteps: GUIDANCE_STEPS,
    currentGuidanceStep: currentGuidanceStep
      ? { ...currentGuidanceStep, message: personalizedMessage }
      : undefined,
    childName,
  };
}
