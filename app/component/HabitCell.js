"use client";

export default function HabitCell({ checked, onClick, isToday }) {
  return (
    <div
      onClick={onClick}
      className={`w-8 h-8 rounded-md cursor-pointer transition
        ${checked ? "bg-green-500" : "bg-gray-200"}
        ${isToday ? "ring-2 ring-blue-400" : ""}
      `}
    />
  );
}

