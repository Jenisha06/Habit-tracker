"use client";

export default function HabitCell({ checked, onClick, isToday }) {
  return (
    <div
      onClick={onClick}
      className={`w-8 h-8 rounded-md cursor-pointer transition
        ${checked ? "bg-[#816ab1]" : "bg-[#D6CDEA]"}
        ${isToday ? "ring-2 ring-black" : ""}
      `}
    />
  );
}

