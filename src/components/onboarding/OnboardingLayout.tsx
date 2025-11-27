import { ReactNode } from "react";
import sageAvatar from "@/assets/mascot-casual.png";
import OnboardingProgressBar from "./OnboardingProgressBar";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

const OnboardingLayout = ({ children, currentStep, totalSteps }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Mobile Sage - At top center */}
      <div className="md:hidden flex justify-center pt-6">
        <img
          src={sageAvatar}
          alt="Sage the mascot"
          className="w-[120px] h-auto object-contain"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-8 md:px-6 md:py-12">
        {/* Progress Bar - Desktop */}
        <div className="hidden md:block mb-8">
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Centered content with absolutely positioned Sage on desktop */}
        <div className="relative w-full flex justify-center">
          {/* Sage Mascot - Desktop only, absolutely positioned to the left */}
          <div className="hidden md:block absolute left-0 md:left-8 lg:left-16 top-0 md:w-[140px] lg:w-[160px]">
            <img
              src={sageAvatar}
              alt="Sage the mascot"
              className="w-full h-auto object-contain animate-float"
            />
          </div>

          {/* Content - Always centered */}
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </div>

        {/* Progress Bar - Mobile (below content) */}
        <div className="md:hidden mt-8">
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
