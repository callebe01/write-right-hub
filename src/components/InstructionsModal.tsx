import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: {
    title: string;
    type: string;
    wordCount: string;
    instructions: string[];
    image: string;
    points: number;
  };
}

const InstructionsModal = ({ isOpen, onClose, assignment }: InstructionsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 to-gray-950/95 border-4 border-spark-card-border">
        <DialogHeader>
          <DialogTitle className="sr-only">{assignment.title} Instructions</DialogTitle>
        </DialogHeader>

        {/* Quest Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            {/* Image */}
            <img
              src={assignment.image}
              alt={assignment.title}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-white/10 flex-shrink-0"
            />

            {/* Title */}
            <div className="flex-1">
              <h2 className="font-game text-3xl text-white uppercase leading-tight mb-2">
                {assignment.title}
              </h2>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
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

          {/* Instructions */}
          <div className="pt-4">
            <h3 className="font-game text-2xl text-white uppercase mb-4">Instructions</h3>
            <div className="space-y-4">
              {assignment.instructions.map((paragraph, index) => (
                <p key={index} className="text-white/90 text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsModal;
