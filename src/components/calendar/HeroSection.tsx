import { motion } from "framer-motion";
import heroImage from "@/assets/hero-calendar.jpg";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

interface HeroSectionProps {
  month: number;
  year: number;
}

const HeroSection = ({ month, year }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-48 md:h-56 lg:h-full lg:min-h-[300px] rounded-2xl overflow-hidden">
      <img
        src={heroImage}
        alt="Calendar hero"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_60%_15%/0.7)] via-[hsl(220_60%_15%/0.3)] to-transparent" />

      <motion.div
        key={`${month}-${year}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
      >
        <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight" style={{ color: "white" }}>
          {MONTH_NAMES[month]}
        </h1>
        <p className="text-lg font-light mt-1 tracking-wide" style={{ color: "rgba(255,255,255,0.8)" }}>
          {year}
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
