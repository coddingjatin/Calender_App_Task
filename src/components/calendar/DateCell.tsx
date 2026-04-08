import { motion } from "framer-motion";
import type { DateRange } from "@/hooks/useCalendar";

interface DateCellProps {
  date: Date;
  currentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  onClick: () => void;
}

const DateCell = ({
  date,
  currentMonth,
  isToday,
  isWeekend,
  isStart,
  isEnd,
  isInRange,
  onClick,
}: DateCellProps) => {
  const day = date.getDate();

  // Range background shapes
  let rangeBg = "";
  if (isStart && isEnd) {
    rangeBg = "";
  } else if (isStart) {
    rangeBg = "bg-primary/10 rounded-l-full";
  } else if (isEnd) {
    rangeBg = "bg-primary/10 rounded-r-full";
  } else if (isInRange) {
    rangeBg = "bg-primary/10";
  }

  return (
    <div className={`relative ${rangeBg}`}>
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`
          relative w-full aspect-square flex items-center justify-center
          text-sm font-medium rounded-full transition-colors duration-200
          ${!currentMonth ? "text-muted-foreground/40" : ""}
          ${currentMonth && isWeekend && !isStart && !isEnd ? "text-weekend" : ""}
          ${currentMonth && !isWeekend && !isStart && !isEnd ? "text-foreground" : ""}
          ${isToday && !isStart && !isEnd ? "ring-2 ring-primary/50 text-primary font-bold" : ""}
          ${isStart || isEnd ? "gradient-primary text-primary-foreground font-bold shadow-md" : ""}
          ${currentMonth && !isStart && !isEnd ? "hover:bg-secondary" : ""}
        `}
      >
        {day}
      </motion.button>
    </div>
  );
};

export default DateCell;
