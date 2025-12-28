"use client";
import { useEffect, useState } from "react";
import HabitRow from "../component/HabitRow";
import { getHabitLog } from "@/lib/firestore";
import { useAuth } from "../context/AuthContext";

export default function HabitGrid({ habits = [], month, year }) {
  const { user } = useAuth();

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = month === todayMonth && year === todayYear;

  // 🔹 DAILY LOG STATE
  const [dailyLog, setDailyLog] = useState({});

  // 🔹 CREATE YYYY-MM-DD KEYS
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  });

  // 🔹 LOAD TODAY'S LOG FROM FIRESTORE
  useEffect(() => {
    if (!user) return;

    const todayKey = `${todayYear}-${String(todayMonth + 1).padStart(2, "0")}-${String(todayDate).padStart(2, "0")}`;

    getHabitLog(user.uid, todayKey).then((data) => {
      setDailyLog((prev) => ({
        ...prev,
        [todayKey]: data,
      }));
    });
  }, [user]);

  return (
    <div className="overflow-x-auto mt-85">
      {/* DATE HEADER */}
      <div className="grid grid-cols-[40px_repeat(34,1fr)] mb-2 text-center text-sm ">
        <div />
        {days.map((dateKey, i) => {
          const dayNumber = i + 1;
          const isToday =
            isCurrentMonth && dayNumber === todayDate;

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
      <div className="space-y-2">
        {habits.map((habit) => (
          <HabitRow
            key={habit.id}
            habit={habit}
            days={days}
            dailyLog={dailyLog}
            setDailyLog={setDailyLog}
            todayDate={`${todayYear}-${String(todayMonth + 1).padStart(2, "0")}-${String(todayDate).padStart(2, "0")}`}
          />
        ))}
      </div>
    </div>
  );
}
