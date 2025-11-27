import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import OnboardingLayout from "./OnboardingLayout";
import ChildInfoStep from "./steps/ChildInfoStep";
import InterestsStep from "./steps/InterestsStep";
import SkillLevelStep from "./steps/SkillLevelStep";
import ConsiderationsStep from "./steps/ConsiderationsStep";
import HowItWorksStep from "./steps/HowItWorksStep";
import FirstChallengeStep from "./steps/FirstChallengeStep";
import { useOnboardingStorage } from "@/hooks/useOnboardingStorage";
import {
  childInfoSchema,
  interestsSchema,
  skillLevelSchema,
  considerationsSchema,
  firstChallengeSchema,
} from "@/lib/validations/onboarding";
import type { OnboardingData } from "@/lib/validations/onboarding";

const TOTAL_STEPS = 6;

const ParentOnboarding = () => {
  const navigate = useNavigate();
  const {
    data: savedData,
    currentStep: savedStep,
    saveData,
    saveStep,
    clearStorage,
  } = useOnboardingStorage();

  // Initialize state from saved data or defaults
  const [currentStep, setCurrentStep] = useState(savedStep);
  const [data, setData] = useState<OnboardingData>({
    childName: savedData?.childName || "",
    childBirthdate: savedData?.childBirthdate || undefined,
    interests: savedData?.interests || [],
    skillLevel: savedData?.skillLevel || undefined,
    considerations: savedData?.considerations || [],
    firstChallenge: savedData?.firstChallenge || undefined,
  });

  // Error states
  const [nameError, setNameError] = useState<string>();
  const [birthdateError, setBirthdateError] = useState<string>();
  const [interestsError, setInterestsError] = useState<string>();
  const [skillLevelError, setSkillLevelError] = useState<string>();
  const [considerationsError, setConsiderationsError] = useState<string>();
  const [firstChallengeError, setFirstChallengeError] = useState<string>();

  // Step 1: Child Info handlers
  const handleNameChange = (name: string) => {
    setData((prev) => ({ ...prev, childName: name }));
    setNameError(undefined);
  };

  const handleBirthdateChange = (date: Date | undefined) => {
    setData((prev) => ({ ...prev, childBirthdate: date }));
    setBirthdateError(undefined);
  };

  const handleStep1Continue = () => {
    const result = childInfoSchema.safeParse({
      childName: data.childName,
      childBirthdate: data.childBirthdate,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setNameError(errors.childName?.[0]);
      setBirthdateError(errors.childBirthdate?.[0]);
      return;
    }

    const nextStep = 2;
    setCurrentStep(nextStep);
    saveData(data);
    saveStep(nextStep);
  };

  // Step 2: Interests handlers
  const handleInterestsChange = (interests: string[]) => {
    setData((prev) => ({ ...prev, interests }));
    setInterestsError(undefined);
  };

  const handleStep2Continue = () => {
    const result = interestsSchema.safeParse({ interests: data.interests });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setInterestsError(errors.interests?.[0]);
      return;
    }

    const nextStep = 3;
    setCurrentStep(nextStep);
    saveData(data);
    saveStep(nextStep);
  };

  // Step 3: Skill Level handlers
  const handleSkillLevelChange = (level: string) => {
    setData((prev) => ({ ...prev, skillLevel: level }));
    setSkillLevelError(undefined);
  };

  const handleStep3Continue = () => {
    const result = skillLevelSchema.safeParse({ skillLevel: data.skillLevel });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setSkillLevelError(errors.skillLevel?.[0]);
      return;
    }

    const nextStep = 4;
    setCurrentStep(nextStep);
    saveData(data);
    saveStep(nextStep);
  };

  // Step 4: Considerations handlers
  const handleConsiderationsChange = (considerations: string[]) => {
    setData((prev) => ({ ...prev, considerations }));
    setConsiderationsError(undefined);
  };

  const handleStep4Continue = () => {
    const result = considerationsSchema.safeParse({ considerations: data.considerations });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setConsiderationsError(errors.considerations?.[0]);
      return;
    }

    const nextStep = 5;
    setCurrentStep(nextStep);
    saveData(data);
    saveStep(nextStep);
  };

  // Step 5: How It Works handler (no validation needed)
  const handleStep5Continue = () => {
    const nextStep = 6;
    setCurrentStep(nextStep);
    saveData(data);
    saveStep(nextStep);
  };

  // Step 6: First Challenge handlers
  const handleFirstChallengeChange = (type: "homework" | "quest-library") => {
    setData((prev) => ({ ...prev, firstChallenge: type }));
    setFirstChallengeError(undefined);
  };

  const handleStep6Continue = () => {
    const result = firstChallengeSchema.safeParse({
      firstChallenge: data.firstChallenge,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFirstChallengeError(errors.firstChallenge?.[0]);
      return;
    }

    // Save final completed state
    saveData(data);
    saveStep(7); // Step 7 indicates completion

    // Navigate to Explore page
    navigate("/explore");
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ChildInfoStep
            childName={data.childName}
            childBirthdate={data.childBirthdate}
            onNameChange={handleNameChange}
            onBirthdateChange={handleBirthdateChange}
            onContinue={handleStep1Continue}
            nameError={nameError}
            birthdateError={birthdateError}
          />
        );
      case 2:
        return (
          <InterestsStep
            childName={data.childName}
            selectedInterests={data.interests}
            onInterestsChange={handleInterestsChange}
            onContinue={handleStep2Continue}
            interestsError={interestsError}
          />
        );
      case 3:
        return (
          <SkillLevelStep
            childName={data.childName}
            skillLevel={data.skillLevel}
            onSkillLevelChange={handleSkillLevelChange}
            onContinue={handleStep3Continue}
            skillLevelError={skillLevelError}
          />
        );
      case 4:
        return (
          <ConsiderationsStep
            childName={data.childName}
            selectedConsiderations={data.considerations}
            onConsiderationsChange={handleConsiderationsChange}
            onContinue={handleStep4Continue}
            considerationsError={considerationsError}
          />
        );
      case 5:
        return <HowItWorksStep onContinue={handleStep5Continue} />;
      case 6:
        return (
          <FirstChallengeStep
            childName={data.childName}
            firstChallenge={data.firstChallenge}
            onFirstChallengeChange={handleFirstChallengeChange}
            onContinue={handleStep6Continue}
            firstChallengeError={firstChallengeError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={TOTAL_STEPS}>
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </OnboardingLayout>
  );
};

export default ParentOnboarding;
