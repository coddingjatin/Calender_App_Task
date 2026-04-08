import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays, Moon, Sun } from "lucide-react";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

interface HeaderProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  dark: boolean;
  onToggleTheme: () => void;
}

const Header = ({ month, year, onPrev, onNext, onToday, dark, onToggleTheme }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <motion.div
        key={`${month}-${year}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground">
          {MONTH_NAMES[month]}
        </h2>
        <p className="text-sm text-muted-foreground font-medium">{year}</p>
      </motion.div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          <CalendarDays className="w-3.5 h-3.5" />
          Today
        </button>

        <div className="flex items-center glass rounded-xl overflow-hidden">
          <button
            onClick={onPrev}
            className="p-2 hover:bg-secondary/50 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="w-px h-5 bg-border" />
          <button
            onClick={onNext}
            className="p-2 hover:bg-secondary/50 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>

        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl glass hover:bg-secondary/50 transition-colors"
          aria-label="Toggle theme"
        >
          {dark ? (
            <Sun className="w-4 h-4 text-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
