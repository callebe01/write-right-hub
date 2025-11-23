import Header from "@/components/Header";
import AssignmentCard from "@/components/AssignmentCard";
import DecorativeDots from "@/components/DecorativeDots";
import mascotImage from "@/assets/mascot-hero.png";
import timeTravelerImage from "@/assets/time-traveler.png";
import pioneerLifeImage from "@/assets/pioneer-life.png";
import miFamiliaImage from "@/assets/mi-familia.png";
import californiaGoldImage from "@/assets/california-gold.png";

const assignments = [
  {
    id: 1,
    title: "Time Traveler's Journal",
    image: timeTravelerImage,
    type: "Quick Write",
    wordCount: "100 words",
    points: 20,
  },
  {
    id: 2,
    title: "Pioneer Life",
    image: pioneerLifeImage,
    type: "Essay",
    wordCount: "500 words",
    points: 20,
  },
  {
    id: 3,
    title: "Mi Familia",
    image: miFamiliaImage,
    type: "Quick Write",
    wordCount: "100 words",
    points: 20,
  },
  {
    id: 4,
    title: "California Gold",
    image: californiaGoldImage,
    type: "Quick Write",
    wordCount: "100 words",
    points: 20,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <DecorativeDots />
      
      <Header />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="relative mb-12">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground uppercase leading-tight">
                Your Writing<br />Assignments
              </h1>
              
              <img
                src={mascotImage}
                alt="Spark Space Mascot"
                className="hidden lg:block w-64 h-64 object-contain animate-float"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                title={assignment.title}
                image={assignment.image}
                type={assignment.type}
                wordCount={assignment.wordCount}
                points={assignment.points}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
