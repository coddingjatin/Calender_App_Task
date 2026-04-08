import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, StickyNote, ChevronUp } from "lucide-react";
import type { Note } from "@/hooks/useCalendar";

interface NotesPanelProps {
  notes: Note[];
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
}

const NotesPanel = ({ notes, onAdd, onDelete }: NotesPanelProps) => {
  const [text, setText] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <div className="glass-strong rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground text-sm">Notes</h3>
          <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
            {notes.length}
          </span>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="lg:hidden p-1 rounded-lg hover:bg-secondary transition-colors"
        >
          <ChevronUp
            className={`w-4 h-4 text-muted-foreground transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* Add note form */}
            <form onSubmit={handleSubmit} className="p-4 border-b border-border/30">
              <div className="flex gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 bg-secondary/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
                <button
                  type="submit"
                  className="gradient-primary rounded-xl p-2 text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                Note will be tagged to your selected date/range
              </p>
            </form>

            {/* Notes list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px] lg:max-h-none">
              <AnimatePresence>
                {notes.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-8">
                    No notes yet. Select dates and add your first note!
                  </p>
                )}
                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-secondary/40 rounded-xl p-3 hover:bg-secondary/60 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-primary mb-1">{note.rangeLabel}</p>
                        <p className="text-sm text-foreground leading-relaxed">{note.text}</p>
                      </div>
                      <button
                        onClick={() => onDelete(note.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-destructive/10 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesPanel;
