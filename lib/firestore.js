import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

/* =======================
   HABITS
======================= */

export async function addHabit(userId, name) {
  const habitsRef = collection(db, "users", userId, "habits");

  const docRef = await addDoc(habitsRef, {
    name,
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    name,
  };
}

export async function getHabits(userId) {
  const habitsRef = collection(db, "users", userId, "habits");
  const snapshot = await getDocs(habitsRef);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

/* =======================
   DAILY HABIT LOGS
======================= */

// 🔹 TOGGLE DAILY HABIT
export async function toggleHabitLog(userId, dateKey, habitId) {
  // ✅ Firestore doc ID MUST be string
  const safeDateKey = String(dateKey);

  const logRef = doc(db, "users", userId, "habitLogs", safeDateKey);
  const snap = await getDoc(logRef);

  let newValue = true;

  if (snap.exists()) {
    const data = snap.data();
    newValue = !data?.[habitId];
  }

  await setDoc(
    logRef,
    {
      [habitId]: newValue,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return newValue; // instant UI update
}

export async function getHabitLogsForRange(userId, dateKeys) {
  const results = {};

  for (const dateKey of dateKeys) {
    const ref = doc(db, "users", userId, "habitLogs", dateKey);
    const snap = await getDoc(ref);
    results[dateKey] = snap.exists() ? snap.data() : {};
  }

  return results;
}

// 🔹 GET DAILY LOG
export async function getHabitLog(userId, dateKey) {
  const safeDateKey = String(dateKey);

  const logRef = doc(db, "users", userId, "habitLogs", safeDateKey);
  const snap = await getDoc(logRef);

  return snap.exists() ? snap.data() : {};
}
