"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addHabit, getHabits } from "@/lib/firestore";

import Sidebar from "./Sidebar/page";
import HabitGrid from "./HabitGrid";
import { getHabitLog, toggleHabitLog } from "@/lib/firestore";


export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
const [dailyLog, setDailyLog] = useState({});
const getDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

useEffect(() => {
  if (!user) return;

  const todayKey = getDateKey(new Date());

  getHabitLog(user.uid, todayKey).then(setDailyLog);
}, [user]);


const handleToggleHabit = async (habitId) => {
  if (!user) return;

  const todayKey = getDateKey(new Date());
  const currentValue = dailyLog[habitId] || false;
  const newValue = !currentValue;

  // 🔥 Optimistic UI update
  setDailyLog((prev) => ({
    ...prev,
    [habitId]: newValue,
  }));

  // 🔥 Save to Firestore
  await toggleHabitLog(user.uid, todayKey, habitId, newValue);
};


  // 🔐 AUTH + LOAD HABITS
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;

      setUser(u);
      const data = await getHabits(u.uid);
setHabits(data || []);
    });

    return () => unsub();
  }, []);

  // ➕ ADD HABIT
  const handleAddHabit = async () => {
    if (!user) return;

    const name = prompt("Enter habit name");
    if (!name?.trim()) return;

    const newHabit = await addHabit(user.uid, name.trim());

    // 🔥 instant UI update
    setHabits((prev) => [...prev, newHabit]);
  };

  return (
    <div className="grid grid-cols-[260px_1fr] h-screen">
      <Sidebar
        habits={habits}
        selectedHabitId={selectedHabitId}
        onSelectHabit={setSelectedHabitId}
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        onAddHabit={handleAddHabit} // 🔑 wired
      />
<HabitGrid
  habits={habits}
  dailyLog={dailyLog}
  onToggleHabit={handleToggleHabit}
  month={month}
  year={year}
/>

    </div>
  );
}
