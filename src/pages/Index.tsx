import Header from "@/components/Header";
import AssignmentCard from "@/components/AssignmentCard";
import DecorativeDots from "@/components/DecorativeDots";
import AnimatedMascot from "@/components/AnimatedMascot";
import timeTravelerImage from "@/assets/time-traveler.png";
import pioneerLifeImage from "@/assets/pioneer-life.png";
import miFamiliaImage from "@/assets/mi-familia.png";
import californiaGoldImage from "@/assets/california-gold.png";

export const assignments = [
  {
    id: 1,
    title: "Time Traveler's Journal",
    image: timeTravelerImage,
    type: "Quick Write",
    wordCount: "100 words",
    points: 25,
    rarity: "rare",
    questType: "RARE QUEST",
    features: ["⚡ Speed Run", "⏱️ Time Limited", "💎 Rare Loot"],
    instructions: [
      "Imagine you've traveled back in time to an important historical event we've studied in class.",
      "Write a journal entry describing your experience. Explain what you see happening around you, who you meet, and how you feel about witnessing this moment in history.",
      "Be sure to include details that make your reader feel like they're right there with you!"
    ]
  },
  {
    id: 2,
    title: "Pioneer Life",
    image: pioneerLifeImage,
    type: "Essay",
    wordCount: "500 words",
    points: 50,
    rarity: "epic",
    questType: "EPIC QUEST",
    features: ["⚔️ Boss Battle", "✨ XP++", "🌟 Glowing Border"],
    instructions: [
      "You are a pioneer traveling west during the 1800s. Life on the trail is difficult, but you're determined to reach your destination.",
      "Write an essay describing the challenges pioneers faced during westward expansion. Include specific examples of hardships they encountered and how they overcame them.",
      "Use evidence from your textbook and class discussions to support your points. Organize your essay with a clear introduction, body paragraphs, and conclusion."
    ]
  },
  {
    id: 3,
    title: "Mi Familia",
    image: miFamiliaImage,
    type: "Quick Write",
    wordCount: "100 words",
    points: 15,
    rarity: "uncommon",
    questType: "UNCOMMON QUEST",
    features: ["📅 Daily Challenge", "🎯 Easy Win", "🔄 Repeatable"],
    instructions: [
      "Write about your family! Describe the people who are important to you and what makes them special.",
      "You can write about family traditions, favorite memories, or what you like to do together.",
      "Use descriptive words to help your reader picture your family and understand why they mean so much to you."
    ]
  },
  {
    id: 4,
    title: "California Gold",
    image: californiaGoldImage,
    type: "Quick Write",
    wordCount: "100 words",
    points: 20,
    rarity: "uncommon",
    questType: "UNCOMMON QUEST",
    features: ["⛏️ Quest Chain", "🏆 Achievement", "📖 Story Mode"],
    instructions: [
      "The year is 1849, and gold has been discovered in California! You've decided to join the Gold Rush and seek your fortune.",
      "Write about your journey to California and your first day searching for gold. What do you hope to find? What challenges do you face?",
      "Make your writing exciting and help your reader feel the thrill of the Gold Rush era!"
    ]
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-spark-main-bg relative overflow-hidden">
      <DecorativeDots />

      <Header />

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          {/* Title Section */}
          <div className="relative mb-8">
            <h1 className="font-game text-[61px] text-spark-title-yellow text-center uppercase leading-normal tracking-[1.22px]">
              Your Quests
            </h1>
          </div>

          {/* Assignment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                id={assignment.id}
                title={assignment.title}
                image={assignment.image}
                type={assignment.type}
                wordCount={assignment.wordCount}
                points={assignment.points}
                rarity={assignment.rarity}
                questType={assignment.questType}
                features={assignment.features}
              />
            ))}
          </div>
        </div>

        {/* Mascot - Spinning transformation animation */}
        <AnimatedMascot />
      </main>
    </div>
  );
};

export default Index;
