import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface AssignmentCardProps {
  id: number;
  title: string;
  image: string;
  type: string;
  wordCount: string;
  points: number;
  features: string[];
}

const AssignmentCard = ({
  id,
  title,
  image,
  type,
  wordCount,
  points,
  features
}: AssignmentCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative rounded-[32px] border-4 border-spark-card-border overflow-hidden cursor-pointer bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-sm shadow-2xl"
      initial={{ scale: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        y: -12,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {/* Hero Image at Top */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        {/* Coins in top-left */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1 border border-spark-coin-gold/50 backdrop-blur-sm">
          {/* Golden Coin Icon */}
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 bg-gradient-to-br from-spark-coin-gold to-yellow-600 rounded-full"></div>
            <div className="absolute inset-0.5 bg-gradient-to-br from-spark-coin-gold to-yellow-500 rounded-full shadow-coin"></div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-yellow-900 text-xs font-bold">$</div>
          </div>
          {/* Points */}
          <span className="text-spark-coin-gold font-black text-sm px-1">+{points}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Title */}
        <h3 className="font-game text-4xl text-white uppercase leading-tight break-words">
          {title}
        </h3>

        {/* Badges Row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Type Badge */}
          <span className="px-3 py-1.5 rounded-full font-bold text-sm bg-spark-teal/20 text-spark-teal border border-spark-teal/50">
            {type}
          </span>

          {/* Word Count Badge */}
          <span className="px-3 py-1.5 rounded-full border-2 border-white/30 text-white font-bold text-sm bg-black/20">
            {wordCount}
          </span>
        </div>

        {/* Accept Mission Button */}
        <motion.button
          onClick={() => navigate(`/quest/${id}`)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 font-black text-lg py-3 px-6 rounded-full uppercase tracking-wide transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-yellow-300"
        >
          Accept Mission
        </motion.button>
      </div>

    </motion.div>
  );
};

export default AssignmentCard;
