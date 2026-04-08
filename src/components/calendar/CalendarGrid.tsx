import { motion, AnimatePresence } from "framer-motion";
import DateCell from "./DateCell";
import type { DateRange } from "@/hooks/useCalendar";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, range: DateRange) {
  if (!range.start || !range.end) return false;
  return date > range.start && date < range.end;
}

interface CalendarGridProps {
  days: { date: Date; currentMonth: boolean }[];
  range: DateRange;
  month: number;
  year: number;
  onSelectDate: (date: Date) => void;
  onClearRange: () => void;
}

const CalendarGrid = ({ days, range, month, year, onSelectDate, onClearRange }: CalendarGridProps) => {
  const today = new Date();
  const hasRange = range.start !== null;

  return (
    <div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${month}-${year}`}
          initial={{ opacity: 0, rotateX: -15, y: 20 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: 15, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="grid grid-cols-7 gap-y-1"
        >
          {days.map(({ date, currentMonth }, i) => {
            const isToday = isSameDay(date, today);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isStart = range.start ? isSameDay(date, range.start) : false;
            const isEnd = range.end ? isSameDay(date, range.end) : false;
            const inRange = isInRange(date, range);

            return (
              <DateCell
                key={i}
                date={date}
                currentMonth={currentMonth}
                isToday={isToday}
                isWeekend={isWeekend}
                isStart={isStart}
                isEnd={isEnd}
                isInRange={inRange}
                onClick={() => onSelectDate(date)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Range indicator */}
      {hasRange && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center justify-between text-xs text-muted-foreground"
        >
          <span>
            {range.start?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            {range.end && ` → ${range.end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
            {!range.end && " — select end date"}
          </span>
          <button
            onClick={onClearRange}
            className="text-primary hover:underline font-medium"
          >
            Clear
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CalendarGrid;
