import { useState, useCallback, useEffect } from "react";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  text: string;
  rangeLabel: string; // e.g. "March 2025" or "Mar 5 - Mar 12"
  createdAt: number;
}

const STORAGE_KEY = "calendar-notes";

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<Note[]>(loadNotes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const goToPrevMonth = useCallback(() => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    setRange({ start: null, end: null });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    setRange({ start: null, end: null });
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
    setRange({ start: null, end: null });
  }, []);

  const selectDate = useCallback((date: Date) => {
    setRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      if (date < prev.start) {
        return { start: date, end: prev.start };
      }
      return { start: prev.start, end: date };
    });
  }, []);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
  }, []);

  const addNote = useCallback(
    (text: string) => {
      const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December",
      ];
      let rangeLabel = `${monthNames[month]} ${year}`;
      if (range.start && range.end) {
        const s = range.start;
        const e = range.end;
        rangeLabel = `${monthNames[s.getMonth()].slice(0, 3)} ${s.getDate()} – ${monthNames[e.getMonth()].slice(0, 3)} ${e.getDate()}`;
      } else if (range.start) {
        const s = range.start;
        rangeLabel = `${monthNames[s.getMonth()].slice(0, 3)} ${s.getDate()}, ${s.getFullYear()}`;
      }

      const note: Note = {
        id: crypto.randomUUID(),
        text,
        rangeLabel,
        createdAt: Date.now(),
      };
      setNotes((prev) => [note, ...prev]);
    },
    [month, year, range]
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Build calendar days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const days: { date: Date; currentMonth: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      currentMonth: false,
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(year, month, i), currentMonth: true });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year, month + 1, i), currentMonth: false });
  }

  return {
    currentDate,
    year,
    month,
    days,
    range,
    notes,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    clearRange,
    addNote,
    deleteNote,
  };
}
