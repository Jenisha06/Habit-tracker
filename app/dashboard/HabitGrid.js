"use client";
import { useEffect, useState } from "react";
import HabitRow from "../component/HabitRow";
import { getHabitLog } from "@/lib/firestore";
import { useAuth } from "../context/AuthContext";
import { calculateMonthlyCompletion } from "@/lib/stats";

export default function HabitGrid({
  habits = [],
  month,
  year,
  onCompletionChange,
}) {
  const { user } = useAuth();

  const [dailyLog, setDailyLog] = useState({});
  const [completionPercent, setCompletionPercent] = useState(0);

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = month === todayMonth && year === todayYear;

  // 🔹 YYYY-MM-DD KEYS
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  });

  const todayKey = `${todayYear}-${String(todayMonth + 1).padStart(
    2,
    "0"
  )}-${String(todayDate).padStart(2, "0")}`;

  // 🔹 LOAD MONTH LOGS
  useEffect(() => {
    if (!user) return;

    async function loadMonthLogs() {
      const logs = {};

      for (const dateKey of days) {
        const data = await getHabitLog(user.uid, dateKey);
        if (Object.keys(data).length > 0) {
          logs[dateKey] = data;
        }
      }

      setDailyLog(logs);
    }

    loadMonthLogs();
  }, [user, month, year]);

  // 🔹 CALCULATE COMPLETION %
  useEffect(() => {
    const percent = calculateMonthlyCompletion({
      habits,
      dailyLog,
      month,
      year,
    });

    setCompletionPercent(percent);
    onCompletionChange?.(percent);
  }, [habits, dailyLog, month, year, onCompletionChange]);

  return (
    <div className="overflow-x-auto ">
      {/* DATE HEADER */}
      <div className="grid grid-cols-[10px_repeat(33,1fr)] mb-2 text-center text-sm">
        <div />
        {days.map((dateKey, i) => {
          const dayNumber = i + 1;
          const isToday = isCurrentMonth && dayNumber === todayDate;

          return (
            <div
              key={dateKey}
              className={`py-1 font-medium rounded-md ${
                isToday ? "bg-[#F6E27F]" : ""
              }`}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>

      {/* HABIT ROWS */}
      <div className="space-y-2 ">
        {habits.map((habit) => (
          <HabitRow
            key={habit.id}
            habit={habit}
            days={days}
            dailyLog={dailyLog}
            setDailyLog={setDailyLog}
            todayDate={todayKey}
          />
        ))}
      </div>
    </div>
  );
}
