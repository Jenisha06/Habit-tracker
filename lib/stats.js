// lib/stats.js

export function calculateMonthlyCompletion({
  habits = [],
  dailyLog = {},
  month,
  year,
}) {
  if (!habits.length) return 0;

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const validDays = isCurrentMonth ? today.getDate() : daysInMonth;

  let completed = 0;
  let total = habits.length * validDays;

  for (let day = 1; day <= validDays; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    habits.forEach((habit) => {
      if (dailyLog?.[dateKey]?.[habit.id]) {
        completed += 1;
      }
    });
  }

  return total === 0 ? 0 : Math.round((completed / total) * 100);
}
