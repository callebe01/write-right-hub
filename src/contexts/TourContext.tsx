import { createContext, useContext, useState, ReactNode } from "react";

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for element to highlight
  placement?: "top" | "bottom" | "left" | "right" | "center";
  action?: () => void; // Optional action to perform when step is shown
  route?: string; // Optional route to navigate to
}

export interface TourFlow {
  id: string;
  name: string;
  description: string;
  steps: TourStep[];
}

interface TourContextType {
  isActive: boolean;
  currentFlow: TourFlow | null;
  currentStepIndex: number;
  startTour: (flow: TourFlow) => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTour: () => void;
  goToStep: (index: number) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within TourProvider");
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider = ({ children }: TourProviderProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<TourFlow | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = (flow: TourFlow) => {
    setCurrentFlow(flow);
    setCurrentStepIndex(0);
    setIsActive(true);

    // Execute first step's action if it exists
    if (flow.steps[0]?.action) {
      flow.steps[0].action();
    }
  };

  const nextStep = () => {
    if (!currentFlow) return;

    if (currentStepIndex < currentFlow.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);

      // Execute next step's action if it exists
      if (currentFlow.steps[nextIndex]?.action) {
        currentFlow.steps[nextIndex].action();
      }
    } else {
      // Tour completed
      skipTour();
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);

      // Execute previous step's action if it exists
      if (currentFlow?.steps[prevIndex]?.action) {
        currentFlow.steps[prevIndex].action();
      }
    }
  };

  const skipTour = () => {
    setIsActive(false);
    setCurrentFlow(null);
    setCurrentStepIndex(0);
  };

  const goToStep = (index: number) => {
    if (!currentFlow || index < 0 || index >= currentFlow.steps.length) return;

    setCurrentStepIndex(index);

    // Execute step's action if it exists
    if (currentFlow.steps[index]?.action) {
      currentFlow.steps[index].action();
    }
  };

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentFlow,
        currentStepIndex,
        startTour,
        nextStep,
        previousStep,
        skipTour,
        goToStep,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};
