import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TourProvider } from "@/contexts/TourContext";
import FloatingGuideButton from "@/components/FloatingGuideButton";
import TourOverlay from "@/components/TourOverlay";
import { tourFlows } from "@/data/tourFlows";
import Index from "./pages/Index";
import QuestInstructions from "./pages/QuestInstructions";
import QuestWriter from "./pages/QuestWriter";
import Classes from "./pages/Classes";
import Explore from "./pages/Explore";
import Games from "./pages/Games";
import ParentOnboarding from "./components/onboarding/ParentOnboarding";
import OnboardingComplete from "./pages/OnboardingComplete";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TourProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quest/:id" element={<QuestInstructions />} />
            <Route path="/quest/:id/write" element={<QuestWriter />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/games" element={<Games />} />
            <Route path="/parent-onboarding" element={<ParentOnboarding />} />
            <Route path="/onboarding-complete" element={<OnboardingComplete />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Tour System UI */}
          <FloatingGuideButton flows={tourFlows} />
          <TourOverlay />
        </BrowserRouter>
      </TourProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
