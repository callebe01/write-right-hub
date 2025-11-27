import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  return (
    <div className="min-h-screen bg-spark-main-atmospheric relative overflow-hidden">
      <DecorativeDots />

      <main className="relative z-10 min-h-screen flex items-center justify-center py-12 px-6">
        <div className="max-w-4xl w-full space-y-8">
          {/* Quest Header */}
          <div className="rounded-[32px] border-4 border-spark-card-border bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-sm p-6 shadow-2xl">

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
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="px-3 py-1.5 rounded-full font-bold text-sm bg-spark-teal/20 text-spark-teal border border-spark-teal/50">
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
          <div className="rounded-[32px] border-4 border-spark-card-border/50 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-8 shadow-xl">

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
            <motion.button
              onClick={() => navigate(`/quest/${id}/write`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-md bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 font-black text-2xl py-4 px-8 rounded-full uppercase tracking-wide transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-yellow-300 flex items-center justify-center gap-3"
            >
              I'm Ready!
              <ArrowRight className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold text-lg underline hover:text-spark-yellow transition-colors"
            >
              Back to Assignments
            </motion.button>
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
