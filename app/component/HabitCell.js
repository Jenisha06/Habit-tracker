"use client";

export default function HabitCell({ checked, onClick, isToday, disabled }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`w-8 h-8 rounded-md transition
        ${checked ? "bg-[#816ab1]" : "bg-[#D6CDEA]"}
        ${isToday ? "ring-2 ring-black" : ""}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
    />
  );
}



      

