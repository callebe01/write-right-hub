import { Zap } from "lucide-react";
import { NavLink } from "./NavLink";

const Header = () => {
  return (
    <header className="px-6 py-4 border-b border-border/20">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-8 h-8 fill-spark-yellow text-spark-yellow" />
          <span className="font-display text-2xl text-foreground">Spark Space</span>
        </div>
        
        <ul className="flex items-center gap-8">
          <li>
            <NavLink
              to="/"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              My Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/classes"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/games"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              activeClassName="text-foreground"
            >
              Games
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
