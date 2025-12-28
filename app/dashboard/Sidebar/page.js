"use client";

export default function Sidebar({
  habits,
  selectedHabitId,
  onSelectHabit,
  month,
  year,
  setMonth,
  setYear,
  onAddHabit,
}) {
  const today = new Date();

  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const dayNames = [
    "Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday",
  ];

  const monthNames = [
    "January","February","March","April",
    "May","June","July","August",
    "September","October","November","December",
  ];

  const todayDayName = dayNames[today.getDay()];
  const todayMonthName = monthNames[todayMonth];

  const todayKey = `${todayYear}-${String(todayMonth + 1).padStart(2,"0")}-${String(todayDate).padStart(2,"0")}`;
  const months = monthNames;

  return (
    <div className="h-full border-r bg-white dark:bg-gray-900 p-4 flex flex-col w-full md:w-64">
      {/* HEADER */}
      <div className="bg-[#F6E27F] pt-3 rounded-[30px] mb-6 text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-800">
          Habit Tracker
        </h2>
      </div>

      {/* YEAR / MONTH SELECTORS */}
      <div className="flex flex-col mb-4 bg-[#D6CDEA] dark:bg-gray-800 rounded-[30px]">
        <div className="flex items-center justify-evenly p-2 text-[#682860] dark:text-[#F6E27F]">
          <h3 className="font-bold mr-5">Year</h3>
          <h3 className="font-bold">Month</h3>
        </div>

        <div className="bg-[#F6E27F] dark:bg-[#682860] rounded-b-[30px] flex items-center justify-center p-2 space-x-2">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-1/2 rounded-md p-2 dark:bg-gray-700 dark:text-gray-200"
          >
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-1/2 p-2 rounded-md dark:bg-gray-700 dark:text-gray-200"
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TODAY */}
      <div className="mb-4 bg-[#F6E27F] dark:bg-[#682860] rounded-[30px] p-3 text-center">
        <p className="text-base sm:text-lg font-semibold text-[#682860] dark:text-[#F6E27F]">
          {todayDayName}
        </p>
        <p className="text-xs sm:text-sm text-[#682860] dark:text-gray-200">
          {todayDate} {todayMonthName} {todayYear}
        </p>
      </div>

      {/* ADD HABIT */}
      <button
        className="mb-4 rounded-md bg-[#D6CDEA] dark:bg-gray-800 py-2 text-[#682860] dark:text-[#F6E27F] flex items-center justify-center"
        onClick={onAddHabit}
      >
        <span className="text-xl sm:text-2xl font-bold mr-2">+</span>
        Add Habit
      </button>

      {/* HABIT LIST */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => onSelectHabit(habit.id)}
            className={`w-full text-left rounded-md px-3 py-2 transition ${
              selectedHabitId === habit.id
                ? "bg-[#D6CDEA] dark:bg-gray-700 text-[#682860] dark:text-[#F6E27F]"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {habit.name}
          </button>
        ))}
      </div>
    </div>
  );
}
