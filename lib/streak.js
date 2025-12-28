// lib/streak.js

export function calculateStreak(dailyLog, habitId, todayKey) {
  let streak = 0;

  let currentDate = new Date(todayKey);

  while (true) {
    const key = currentDate.toISOString().split("T")[0];

    if (!dailyLog?.[key]?.[habitId]) break;

    streak += 1;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}
