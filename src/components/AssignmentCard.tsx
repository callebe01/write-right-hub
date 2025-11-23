import { Button } from "@/components/ui/button";
import { ArrowRight, Coins } from "lucide-react";

interface AssignmentCardProps {
  title: string;
  image: string;
  type: string;
  wordCount: string;
  points: number;
}

const AssignmentCard = ({ title, image, type, wordCount, points }: AssignmentCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/10 hover:border-accent/20 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-24 h-24 rounded-xl object-cover shadow-md"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-display text-2xl md:text-3xl text-card-foreground mb-3 uppercase">
            {title}
          </h3>
          
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-4 py-1 rounded-full border-2 border-accent text-accent font-semibold text-sm uppercase">
              {type}
            </span>
            <span className="px-4 py-1 rounded-full bg-muted text-muted-foreground font-semibold text-sm">
              {wordCount}
            </span>
            <div className="flex items-center gap-1.5 text-spark-yellow font-bold">
              <Coins className="w-5 h-5 fill-spark-yellow" />
              <span>+ {points}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Button variant="spark" size="lg" className="gap-2">
            Start Assignment
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
