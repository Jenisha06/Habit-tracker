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
    <div className="h-full border-r bg-white p-4 flex flex-col">
      
      <div className="bg-[#F6E27F] pt-3 rounded-[50px] mb-6 text-center">
        <h2 className="text-xl font-semibold mb-6">Habit Tracker</h2>
      </div>

     
      <div className="flex flex-col mb-4 bg-[#D6CDEA] rounded-[30px]">
        <div className="flex items-center justify-evenly p-2 text-[#682860]">
          <h3 className="font-bold mr-5">Year</h3>
          <h3 className="font-bold">Month</h3>
        </div>

        <div className="bg-[#F6E27F] rounded-b-[30px] flex items-center justify-center p-2 space-x-2">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-1/2 rounded-md p-2"
          >
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-1/2 p-2"
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TODAY */}
      <div className="mb-4 bg-[#F6E27F] rounded-[30px] p-3 text-center">
        <p className="text-lg font-semibold text-[#682860]">
          {todayDayName}
        </p>
        <p className="text-sm text-[#682860]">
          {todayDate} {todayMonthName} {todayYear}
        </p>
      </div>

      {/* Add Habit */}
      <button
        className="mb-4 rounded-md bg-[#D6CDEA] py-2 text-[#682860]"
        onClick={onAddHabit} // 🔥 real backend hook
      >
        <span className="text-2xl font-bold mr-4">+</span>
        Add Habit
      </button>

      {/* Habit List */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => onSelectHabit(habit.id)}
            className={`w-full text-left rounded-md px-3 py-2 transition ${
              selectedHabitId === habit.id
                ? "bg-[#D6CDEA] text-[#682860]"
                : "hover:bg-gray-100"
            }`}
          >
            {habit.name}
          </button>
        ))}
      </div>
    </div>
  );
}
