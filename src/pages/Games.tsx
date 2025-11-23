import Header from "@/components/Header";
import DecorativeDots from "@/components/DecorativeDots";

const Games = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <DecorativeDots />
      <Header />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="font-display text-5xl md:text-6xl text-foreground uppercase mb-8">
            Games
          </h1>
          <p className="text-foreground/80 text-lg">
            Fun writing games and activities coming soon! Practice your skills while having fun.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Games;
