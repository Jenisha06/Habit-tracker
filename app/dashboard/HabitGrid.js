"use client";
import HabitRow from "../component/HabitRow";

export default function HabitGrid({ habits = [], month, year }) {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = month === todayMonth && year === todayYear;

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-[200px_repeat(31,1fr)] mb-2 text-center text-sm my-35">
        <div />
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const isToday = isCurrentMonth && date === todayDate;

          return (
            <div
              key={date}
              className={`py-1 font-medium rounded-md ${
                isToday ? "bg-[#F6E27F]" : ""
              }`}
            >
              {date}
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        {habits.map((habit) => (
         <HabitRow
  key={habit.id}
  habit={habit}
  days={Array.from({ length: daysInMonth }, (_, i) => i + 1)}
  dailyLog={{}}
  onToggleHabit={() => {}}
  todayDate={todayDate}
/>
        ))}
      </div>
    </div>
  );
}
