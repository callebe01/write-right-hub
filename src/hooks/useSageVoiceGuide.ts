import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { getFormattedHint, type HintContext } from "@/lib/sageHints";

const STORAGE_KEY = "sage-voice-guide-state";
const AUTO_COLLAPSE_DELAY = 10000; // 10 seconds

interface SageVoiceGuideState {
  isExpanded: boolean;
  isMuted: boolean;
  hasSeenFirstVisit: boolean;
  preferredCollapsed: boolean;
}

interface UseSageVoiceGuideProps {
  searchQuery: string;
  gradeLevel: string;
  subject: string;
  type: string;
  questCount: number;
  hoveredQuestId: number | null;
}

export function useSageVoiceGuide(props: UseSageVoiceGuideProps) {
  const {
    searchQuery,
    gradeLevel,
    subject,
    type,
    questCount,
    hoveredQuestId,
  } = props;

  // Initialize state from localStorage
  const [state, setState] = useState<SageVoiceGuideState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          isExpanded: false, // Always start collapsed on mobile
          isMuted: parsed.isMuted ?? false,
          hasSeenFirstVisit: parsed.hasSeenFirstVisit ?? false,
          preferredCollapsed: parsed.preferredCollapsed ?? false,
        };
      } catch {
        // Fallback to defaults if parsing fails
      }
    }
    return {
      isExpanded: false,
      isMuted: false,
      hasSeenFirstVisit: false,
      preferredCollapsed: false,
    };
  });

  // Auto-collapse timer ref
  const autoCollapseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isMuted: state.isMuted,
        hasSeenFirstVisit: state.hasSeenFirstVisit,
        preferredCollapsed: state.preferredCollapsed,
      })
    );
  }, [state]);

  // Mark first visit as seen after a delay
  useEffect(() => {
    if (!state.hasSeenFirstVisit) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, hasSeenFirstVisit: true }));
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [state.hasSeenFirstVisit]);

  // Build hint context
  const hintContext: HintContext = useMemo(
    () => ({
      searchQuery,
      gradeLevel,
      subject,
      type,
      questCount,
      hoveredQuestId,
      hasSeenFirstVisit: state.hasSeenFirstVisit,
    }),
    [
      searchQuery,
      gradeLevel,
      subject,
      type,
      questCount,
      hoveredQuestId,
      state.hasSeenFirstVisit,
    ]
  );

  // Get current hint with debouncing
  const [currentHint, setCurrentHint] = useState<string>("");
  const [debouncedContext, setDebouncedContext] = useState(hintContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedContext(hintContext);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [hintContext]);

  useEffect(() => {
    const hint = getFormattedHint(debouncedContext);
    setCurrentHint(hint);
  }, [debouncedContext]);

  // Toggle mic mute state
  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  // Toggle expanded state (mobile)
  const toggleExpanded = useCallback(() => {
    setState((prev) => {
      const newExpanded = !prev.isExpanded;

      // Reset auto-collapse timer when expanding
      if (newExpanded && autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
      }

      return {
        ...prev,
        isExpanded: newExpanded,
        preferredCollapsed: !newExpanded,
      };
    });
  }, []);

  // Reset interaction (restart auto-collapse timer)
  const resetInteraction = useCallback(() => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
    }

    // Only set auto-collapse if expanded
    if (state.isExpanded) {
      autoCollapseTimerRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, isExpanded: false }));
      }, AUTO_COLLAPSE_DELAY);
    }
  }, [state.isExpanded]);

  // Set up auto-collapse when expanded
  useEffect(() => {
    if (state.isExpanded) {
      resetInteraction();

      return () => {
        if (autoCollapseTimerRef.current) {
          clearTimeout(autoCollapseTimerRef.current);
        }
      };
    }
  }, [state.isExpanded, resetInteraction]);

  // Auto-collapse on scroll (mobile)
  useEffect(() => {
    const handleScroll = () => {
      if (state.isExpanded) {
        setState((prev) => ({ ...prev, isExpanded: false }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.isExpanded]);

  return {
    isExpanded: state.isExpanded,
    isMuted: state.isMuted,
    currentHint,
    toggleMute,
    toggleExpanded,
    resetInteraction,
  };
}
