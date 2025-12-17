"use client";   // MUST be the very first line

import { useState } from "react";

export default function DashboardPage() {
  const [habits, setHabits] = useState([]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your habits will appear here.</p>
    </div>
  );
}
