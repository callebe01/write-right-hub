import { Coins, Sparkles, BookOpen, BarChart3 } from "lucide-react";

interface FeatureCardProps {
  icon: "coin" | "sparkles" | "book" | "chart";
  title: string;
  description: string;
}

const iconMap = {
  coin: Coins,
  sparkles: Sparkles,
  book: BookOpen,
  chart: BarChart3,
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
        <IconComponent className="w-6 h-6 text-yellow-600" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[15px] text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
