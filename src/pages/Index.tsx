import { useCalendar } from "@/hooks/useCalendar";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/calendar/Header";
import HeroSection from "@/components/calendar/HeroSection";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import NotesPanel from "@/components/calendar/NotesPanel";

const Index = () => {
  const calendar = useCalendar();
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Desktop: side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column: Hero + Calendar */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Hero */}
            <HeroSection month={calendar.month} year={calendar.year} />

            {/* Calendar card */}
            <div className="glass-strong rounded-2xl p-5 md:p-6">
              <Header
                month={calendar.month}
                year={calendar.year}
                onPrev={calendar.goToPrevMonth}
                onNext={calendar.goToNextMonth}
                onToday={calendar.goToToday}
                dark={dark}
                onToggleTheme={toggle}
              />
              <CalendarGrid
                days={calendar.days}
                range={calendar.range}
                month={calendar.month}
                year={calendar.year}
                onSelectDate={calendar.selectDate}
                onClearRange={calendar.clearRange}
              />
            </div>
          </div>

          {/* Right column: Notes */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <NotesPanel
                notes={calendar.notes}
                onAdd={calendar.addNote}
                onDelete={calendar.deleteNote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
