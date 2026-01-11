"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Sun } from "lucide-react";

// Chennai Time Widget
export function TimeWidget() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const chennaiTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const chennaiDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setTime(chennaiTime);
      setDate(chennaiDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="widget-glass rounded-2xl p-4 min-w-[140px]"
    >
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-[var(--foreground-muted)]" />
        <span className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider">Chennai</span>
      </div>
      <div className="text-2xl font-medium text-[var(--foreground)] tracking-tight">
        {time || "--:--"}
      </div>
      <div className="text-sm text-[var(--foreground-secondary)] mt-1">
        {date || "---"}
      </div>
    </motion.div>
  );
}

// Weather Widget (Static for now - can be connected to API)
export function WeatherWidget() {
  const [weather] = useState({
    temp: "28°",
    condition: "Partly Cloudy",
    high: "32°",
    low: "24°",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="widget-glass rounded-2xl p-4 min-w-[140px]"
    >
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-[var(--foreground-muted)]" />
        <span className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider">Chennai</span>
      </div>
      <div className="flex items-center gap-3">
        <Sun className="w-8 h-8 text-amber-400" />
        <div>
          <div className="text-2xl font-medium text-[var(--foreground)] tracking-tight">
            {weather.temp}
          </div>
          <div className="text-xs text-[var(--foreground-secondary)]">
            {weather.condition}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2 text-xs text-[var(--foreground-muted)]">
        <span>H: {weather.high}</span>
        <span>L: {weather.low}</span>
      </div>
    </motion.div>
  );
}

// Quick Contact Widget
export function ContactWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="widget-glass rounded-2xl p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider">Available</span>
      </div>
      <p className="text-sm text-[var(--foreground-secondary)]">
        Ready to discuss your project
      </p>
      <a 
        href="tel:+917395853673"
        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
      >
        +91 73958 53673
      </a>
    </motion.div>
  );
}
