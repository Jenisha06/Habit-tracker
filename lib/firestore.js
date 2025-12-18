import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

// 🔹 ADD HABIT
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

// 🔹 GET HABITS
export async function getHabits(userId) {
  const habitsRef = collection(db, "users", userId, "habits");
  const snapshot = await getDocs(habitsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";


// 🔹 SAVE / TOGGLE DAILY HABIT
export async function toggleHabitLog(userId, dateKey, habitId, value) {
  const logRef = doc(db, "users", userId, "habitLogs", dateKey);

  await setDoc(
    logRef,
    {
      [habitId]: value,
    },
    { merge: true } // 🔥 very important
  );
}

// 🔹 GET DAILY LOG
export async function getHabitLog(userId, dateKey) {
  const logRef = doc(db, "users", userId, "habitLogs", dateKey);
  const snap = await getDoc(logRef);

  return snap.exists() ? snap.data() : {};
}
