import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import AssignmentCard from "@/components/AssignmentCard";
import QuestFilters from "@/components/QuestFilters";
import MascotGuide from "@/components/MascotGuide";
import SageVoiceGuide from "@/components/SageVoiceGuide";
import { QUEST_LIBRARY } from "@/data/questLibrary";
import { filterQuests } from "@/lib/exploreUtils";
import { useExploreGuidance } from "@/hooks/useExploreGuidance";

const Explore = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All Grade Levels");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [typeFilter, setTypeFilter] = useState("Any");

  // Quest hover state for SageVoiceGuide
  const [hoveredQuestId, setHoveredQuestId] = useState<number | null>(null);

  // Guidance state
  const {
    isActive: isGuidanceActive,
    currentStep: guidanceStep,
    totalSteps,
    nextStep,
    previousStep,
    skipGuidance,
    closeGuidance,
    currentGuidanceStep,
  } = useExploreGuidance();

  // Filter quests
  const filteredQuests = useMemo(
    () =>
      filterQuests(QUEST_LIBRARY, {
        search: searchQuery,
        gradeLevel: gradeFilter,
        subject: subjectFilter,
        type: typeFilter,
      }),
    [searchQuery, gradeFilter, subjectFilter, typeFilter]
  );

  const hasNoResults = filteredQuests.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 relative">
      <Header />

      {/* Guide - Show tutorial on first visit, then persistent Sage */}
      {isGuidanceActive ? (
        <MascotGuide
          isActive={isGuidanceActive}
          currentStep={guidanceStep}
          totalSteps={totalSteps}
          onNext={nextStep}
          onPrevious={previousStep}
          onSkip={skipGuidance}
          onClose={closeGuidance}
          currentGuidanceStep={currentGuidanceStep}
        />
      ) : (
        <SageVoiceGuide
          searchQuery={searchQuery}
          gradeLevel={gradeFilter}
          subject={subjectFilter}
          type={typeFilter}
          questCount={filteredQuests.length}
          hoveredQuestId={hoveredQuestId}
        />
      )}

      <main className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 md:pl-[264px]">
          {/* Title */}
          <div className="mb-8">
            <h1 className="font-game text-4xl md:text-5xl text-gray-900 mb-2">
              Explore Quest Library
            </h1>
            <p className="text-gray-600 text-lg">
              Find the perfect writing assignment for your child
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <QuestFilters
              searchQuery={searchQuery}
              gradeLevel={gradeFilter}
              subject={subjectFilter}
              type={typeFilter}
              onSearchChange={setSearchQuery}
              onGradeLevelChange={setGradeFilter}
              onSubjectChange={setSubjectFilter}
              onTypeChange={setTypeFilter}
            />
          </div>

          {/* Quest Grid or Empty State */}
          {hasNoResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  No quests found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search query to find more writing assignments.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setGradeFilter("All Grade Levels");
                    setSubjectFilter("All Subjects");
                    setTypeFilter("Any");
                  }}
                  className="px-6 py-3 rounded-full font-bold
                             bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300
                             text-gray-900 shadow-md hover:shadow-lg transition-all"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuests.map((quest, index) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="assignment-card"
                >
                  <AssignmentCard
                    id={quest.id}
                    title={quest.title}
                    image={quest.image}
                    type={quest.type}
                    wordCount={quest.wordCount}
                    points={quest.points}
                    rarity={quest.rarity}
                    features={quest.features}
                    instructions={quest.instructions}
                    onMouseEnter={() => setHoveredQuestId(quest.id)}
                    onMouseLeave={() => setHoveredQuestId(null)}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Results Count */}
          {!hasNoResults && (
            <div className="mt-8 text-center text-gray-500">
              Showing {filteredQuests.length} of {QUEST_LIBRARY.length} quests
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explore;
