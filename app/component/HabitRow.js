import HabitCell from "./HabitCell";

export default function HabitRow({
  habit,
  days,
  dailyLog,
  onToggleHabit,
  todayDate,
}) {
  return (
    <div className="flex gap-2 items-center">
      {days.map((date) => {
        const isToday = date === todayDate;
        const checked = isToday ? dailyLog[habit.id] : false;

        return (
          <HabitCell
            key={date}
            checked={checked}
            isToday={isToday}
            onClick={() => isToday && onToggleHabit(habit.id)}
          />
        );
      })}
    </div>
  );
}
