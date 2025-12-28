"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addHabit, getHabits } from "@/lib/firestore";
import Sidebar from "./Sidebar/page";
import HabitGrid from "./HabitGrid";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const [completionPercent, setCompletionPercent] = useState(0);
  const [dailyLog, setDailyLog] = useState({});

  const [quote, setQuote] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;
      setUser(u);
      const data = await getHabits(u.uid);
      setHabits(data || []);
    });
    return () => unsub();
  }, []);

  const handleAddHabit = async () => {
    if (!user) return;
    const name = prompt("Enter habit name");
    if (!name?.trim()) return;
    const newHabit = await addHabit(user.uid, name.trim());
    setHabits((prev) => [...prev, newHabit]);
  };

  const todayKey = new Date().toISOString().split("T")[0];
  const todayDone = Object.values(dailyLog?.[todayKey] || {}).filter(Boolean).length;

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json();
        setQuote(`${data[0].q} — ${data[0].a}`);
      } catch (err) {
        setQuote("Stay consistent. Small steps build big habits.");
      } finally {
        setLoadingQuote(false);
      }
    }
    fetchQuote();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] h-screen bg-white dark:bg-gray-900">
      {/* SIDEBAR */}
      <Sidebar
        habits={habits}
        selectedHabitId={selectedHabitId}
        onSelectHabit={setSelectedHabitId}
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        onAddHabit={handleAddHabit}
      />

      {/* MAIN */}
      <div className="p-6 sm:p-10 mt-6 sm:mt-10 overflow-y-auto">
        {/* 🌟 Motivational Quote */}
        <div className="rounded-xl bg-[#F6E27F] dark:bg-[#682860] p-4 sm:p-5 mb-8 sm:mb-12 shadow border-4 border-white dark:border-gray-700">
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 mb-1">
            Today's Thought
          </p>
          {loadingQuote ? (
            <p className="text-gray-400">Loading inspiration…</p>
          ) : (
            <p className="text-gray-800 dark:text-gray-100">{quote}</p>
          )}
        </div>

        {/* 🔝 TOP CARD */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 mb-5 shadow">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Monthly Completion
          </p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {completionPercent}%
          </p>
        </div>

        {/* HABIT GRID */}
        <HabitGrid
          habits={habits}
          month={month}
          year={year}
          onCompletionChange={setCompletionPercent}
        />
      </div>
    </div>
  );
}
