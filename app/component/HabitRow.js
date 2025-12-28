import HabitCell from "./HabitCell";
import { toggleHabitLog } from "@/lib/firestore";
import { useAuth } from "../context/AuthContext";
import { calculateStreak } from "@/lib/streak";

export default function HabitRow({
  habit,
  days = [],
  dailyLog = {},
  todayDate,
  setDailyLog,
}) {
  const { user } = useAuth();

    const streak = calculateStreak(dailyLog, habit.id, todayDate);

  async function handleToggle(dateKey) {
    if (!user) return;

    if (dateKey > todayDate) return;

    // 🔹 Firestore decides the new value
    const newValue = await toggleHabitLog(
      user.uid,
      dateKey,
      habit.id
    );

    // 🔹 Instant UI update
    setDailyLog((prev) => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        [habit.id]: newValue,
      },
    }));
  }

  return (
    <div className="flex gap-2 items-center ml-3 mb-3 ">
      {days.map((dateKey) => {
        const checked = dailyLog?.[dateKey]?.[habit.id] || false;
        const isToday = dateKey === todayDate;

        return (
          <HabitCell
            key={dateKey}
            checked={checked}
            isToday={isToday}
            onClick={() => handleToggle(dateKey)}
          />
        );
      })}
    </div>
  );
}
