import { useState, useEffect, useCallback } from "react";
import { OnboardingData, OnboardingStorage } from "@/lib/validations/onboarding";
import { ONBOARDING_EXPIRY_DAYS } from "@/data/onboardingOptions";

const STORAGE_KEY = "spark-space-parent-onboarding";
const STORAGE_VERSION = 1;

interface UseOnboardingStorageReturn {
  data: Partial<OnboardingData>;
  currentStep: number;
  completedSteps: number[];
  saveData: (newData: Partial<OnboardingData>) => void;
  saveStep: (step: number) => void;
  markStepComplete: (step: number) => void;
  clearStorage: () => void;
  hasExistingData: boolean;
}

export const useOnboardingStorage = (): UseOnboardingStorageReturn => {
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hasExistingData, setHasExistingData] = useState<boolean>(false);

  // Load data from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: OnboardingStorage = JSON.parse(stored);

        // Check version
        if (parsed.version !== STORAGE_VERSION) {
          console.warn("Onboarding storage version mismatch, clearing old data");
          localStorage.removeItem(STORAGE_KEY);
          return;
        }

        // Check expiry (7 days)
        const timestamp = new Date(parsed.timestamp);
        const now = new Date();
        const daysDiff = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24);

        if (daysDiff > ONBOARDING_EXPIRY_DAYS) {
          console.info("Onboarding data expired, clearing");
          localStorage.removeItem(STORAGE_KEY);
          return;
        }

        // Restore data
        setData(parsed.data || {});
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
        setHasExistingData(true);
      }
    } catch (error) {
      console.error("Failed to load onboarding data from LocalStorage:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save to LocalStorage whenever data changes
  const saveToLocalStorage = useCallback(
    (updatedData: Partial<OnboardingData>, updatedStep: number, updatedCompleted: number[]) => {
      try {
        const storageData: OnboardingStorage = {
          version: STORAGE_VERSION,
          timestamp: new Date().toISOString(),
          currentStep: updatedStep,
          completedSteps: updatedCompleted,
          data: updatedData,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
      } catch (error) {
        console.error("Failed to save onboarding data to LocalStorage:", error);

        // Handle quota exceeded error
        if (error instanceof DOMException && error.name === "QuotaExceededError") {
          console.error("LocalStorage quota exceeded");
          // Could show a toast notification here
        }
      }
    },
    []
  );

  // Update form data
  const saveData = useCallback(
    (newData: Partial<OnboardingData>) => {
      const updated = { ...data, ...newData };
      setData(updated);
      saveToLocalStorage(updated, currentStep, completedSteps);
    },
    [data, currentStep, completedSteps, saveToLocalStorage]
  );

  // Update current step
  const saveStep = useCallback(
    (step: number) => {
      setCurrentStep(step);
      saveToLocalStorage(data, step, completedSteps);
    },
    [data, completedSteps, saveToLocalStorage]
  );

  // Mark a step as completed
  const markStepComplete = useCallback(
    (step: number) => {
      const updated = [...new Set([...completedSteps, step])];
      setCompletedSteps(updated);
      saveToLocalStorage(data, currentStep, updated);
    },
    [data, currentStep, completedSteps, saveToLocalStorage]
  );

  // Clear all onboarding data
  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData({});
    setCurrentStep(1);
    setCompletedSteps([]);
    setHasExistingData(false);
  }, []);

  return {
    data,
    currentStep,
    completedSteps,
    saveData,
    saveStep,
    markStepComplete,
    clearStorage,
    hasExistingData,
  };
};
