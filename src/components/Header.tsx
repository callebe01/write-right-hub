import { Share2, Home, Sparkles } from "lucide-react";
import { NavLink } from "./NavLink";

const Header = () => {
  return (
    <header className="bg-spark-header-bg shadow-header h-[75px] px-16 py-3.5">
      <nav className="flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-spark-yellow text-2xl font-bold">👑</div>
          <span className="font-game text-xl text-spark-yellow tracking-wide">Spark Space</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          <li>
            <NavLink
              to="/"
              className="text-white text-sm font-semibold hover:text-spark-yellow transition-colors"
              activeClassName="text-spark-yellow"
            >
              My Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/classes"
              className="text-white text-sm hover:text-spark-yellow transition-colors"
              activeClassName="text-spark-yellow"
            >
              Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className="text-white text-sm hover:text-spark-yellow transition-colors"
              activeClassName="text-spark-yellow"
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/games"
              className="text-white text-sm hover:text-spark-yellow transition-colors"
              activeClassName="text-spark-yellow"
            >
              Games
            </NavLink>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-11">
          {/* PLUS Badge & Coin Counter */}
          <div className="flex items-center gap-2">
            {/* PLUS Badge */}
            <div className="bg-spark-yellow rounded-full px-2 py-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-spark-header-bg fill-spark-header-bg" />
              <span className="text-spark-header-bg font-black text-sm tracking-wide">PLUS</span>
            </div>

            {/* Coin Counter */}
            <div className="bg-spark-progress-bg rounded-full px-2 py-1 flex items-center gap-2 w-[158px]">
              {/* Coin Icon */}
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 bg-gradient-to-br from-spark-coin-gold to-yellow-600 rounded-full"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-spark-coin-gold to-yellow-500 rounded-full shadow-coin"></div>
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 text-spark-coin-gold text-xs font-bold">$</div>
              </div>

              {/* Count */}
              <span className="text-white font-bold text-sm">15</span>

              {/* Progress Bar */}
              <div className="flex-1 h-[7px] bg-spark-progress-bg rounded-full overflow-hidden">
                <div className="h-full w-[43%] bg-spark-yellow rounded-r-full"></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-spark-yellow/10 flex items-center justify-center hover:bg-spark-yellow/20 transition-colors shadow-sm">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button className="w-9 h-9 rounded-full bg-spark-yellow/10 flex items-center justify-center hover:bg-spark-yellow/20 transition-colors shadow-sm">
              <Home className="w-5 h-5 text-white" />
            </button>
            <button className="w-9 h-9 rounded-full bg-spark-yellow/10 flex items-center justify-center hover:bg-spark-yellow/20 transition-colors shadow-sm">
              <span className="text-white font-bold text-base">C</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
