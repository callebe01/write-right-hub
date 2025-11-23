import Header from "@/components/Header";
import DecorativeDots from "@/components/DecorativeDots";

const Explore = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <DecorativeDots />
      <Header />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="font-display text-5xl md:text-6xl text-foreground uppercase mb-8">
            Explore
          </h1>
          <p className="text-foreground/80 text-lg">
            Explore new writing challenges and topics! More content coming soon.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Explore;
