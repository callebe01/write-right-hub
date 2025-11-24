import { useParams, useNavigate } from "react-router-dom";
import { assignments } from "./Index";
import DecorativeDots from "@/components/DecorativeDots";
import mascotImage from "@/assets/mascot-hero.png";
import { ArrowRight } from "lucide-react";

const QuestInstructions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const assignment = assignments.find((a) => a.id === Number(id));

  if (!assignment) {
    return (
      <div className="min-h-screen bg-spark-main-bg flex items-center justify-center">
        <div className="text-white text-2xl">Quest not found</div>
      </div>
    );
  }

  // Get rarity styling
  const rarityColors: Record<string, { border: string; glow: string; text: string; bg: string }> = {
    epic: {
      border: "border-rarity-epic",
      glow: "rgba(168, 85, 247, 0.6)",
      text: "text-rarity-epic",
      bg: "bg-purple-950/50"
    },
    rare: {
      border: "border-rarity-rare",
      glow: "rgba(59, 130, 246, 0.6)",
      text: "text-rarity-rare",
      bg: "bg-blue-950/50"
    },
    uncommon: {
      border: "border-rarity-uncommon",
      glow: "rgba(34, 197, 94, 0.6)",
      text: "text-rarity-uncommon",
      bg: "bg-green-950/50"
    },
    common: {
      border: "border-rarity-common",
      glow: "rgba(156, 163, 175, 0.6)",
      text: "text-rarity-common",
      bg: "bg-gray-950/50"
    }
  };

  const rarityStyle = rarityColors[assignment.rarity] || rarityColors.common;

  return (
    <div className="min-h-screen bg-spark-main-bg relative overflow-hidden">
      <DecorativeDots />

      <main className="relative z-10 min-h-screen flex items-center justify-center py-12 px-6">
        <div className="max-w-4xl w-full space-y-8">
          {/* Quest Header */}
          <div
            className={`rounded-[32px] border-4 ${rarityStyle.border} bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-sm p-6`}
            style={{
              boxShadow: `0 0 40px ${rarityStyle.glow}, 0 0 80px ${rarityStyle.glow}, 0 20px 40px rgba(0, 0, 0, 0.5)`
            }}
          >
            <div className="flex items-center gap-6">
              {/* Image */}
              <img
                src={assignment.image}
                alt={assignment.title}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-white/10 flex-shrink-0"
              />

              {/* Title */}
              <div className="flex-1">
                <h1 className="font-game text-4xl text-white uppercase leading-tight mb-2">
                  {assignment.title}
                </h1>
                <div className={`${rarityStyle.text} font-bold text-sm uppercase tracking-wide mb-3`}>
                  {assignment.questType}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className={`px-3 py-1.5 rounded-full font-bold text-sm ${rarityStyle.bg} ${rarityStyle.text} border ${rarityStyle.border}`}>
                {assignment.type}
              </span>
              <span className="px-3 py-1.5 rounded-full border-2 border-white/30 text-white font-bold text-sm bg-black/20">
                {assignment.wordCount}
              </span>
              <div className="flex items-center gap-1 bg-black/30 rounded-full px-2 py-1 border border-spark-coin-gold/50">
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-spark-coin-gold to-yellow-600 rounded-full"></div>
                  <div className="absolute inset-0.5 bg-gradient-to-br from-spark-coin-gold to-yellow-500 rounded-full shadow-coin"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-yellow-900 text-xs font-bold">$</div>
                </div>
                <span className="text-spark-coin-gold font-black text-sm px-1">+{assignment.points}</span>
              </div>
            </div>
          </div>

          {/* Instructions Panel */}
          <div
            className={`rounded-[32px] border-4 ${rarityStyle.border}/50 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-8`}
            style={{
              boxShadow: `0 0 20px ${rarityStyle.glow}, 0 10px 30px rgba(0, 0, 0, 0.4)`
            }}
          >
            <h2 className="font-game text-3xl text-white uppercase mb-6">Instructions</h2>
            <div className="space-y-4">
              {assignment.instructions.map((paragraph, index) => (
                <p key={index} className="text-white/90 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => navigate(`/quest/${id}/write`)}
              className="w-full max-w-md bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 font-black text-2xl py-4 px-8 rounded-full uppercase tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-yellow-300 flex items-center justify-center gap-3"
            >
              I'm Ready!
              <ArrowRight className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-white font-bold text-lg underline hover:text-spark-yellow transition-colors"
            >
              Back to Assignments
            </button>
          </div>
        </div>

        {/* Mascot */}
        <img
          src={mascotImage}
          alt="Sage the Mascot"
          className="absolute right-[40px] top-[40px] w-[200px] h-[188px] object-contain animate-float pointer-events-none hidden lg:block"
        />
      </main>
    </div>
  );
};

export default QuestInstructions;
