import HabitCell from "./HabitCell";
import { toggleHabitLog } from "@/lib/firestore";
import { useAuth } from "../context/AuthContext";

export default function HabitRow({
  habit,
  days = [],
  dailyLog = {},
  todayDate,
  setDailyLog,
}) {
  const { user } = useAuth();

  async function handleToggle(dateKey, currentValue) {
    if (!user) return;

    const newValue = !currentValue;

    // 1️⃣ Save to Firestore
    await toggleHabitLog(
      user.uid,
      dateKey,
      habit.id,
      newValue
    );

    // 2️⃣ Instantly update UI
    setDailyLog((prev) => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        [habit.id]: newValue,
      },
    }));
  }

  return (
    <div className="flex gap-2 items-center ml-11">
      {days.map((dateKey) => {
        const checked = dailyLog?.[dateKey]?.[habit.id] || false;
        const isToday = dateKey === todayDate;

        return (
          <HabitCell
            key={dateKey}
            checked={checked}
            isToday={isToday}
            onClick={() => handleToggle(dateKey, checked)}
          />
        );
      })}
    </div>
  );
}
