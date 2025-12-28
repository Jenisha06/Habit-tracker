"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  console.log("LOGIN TRY:", {
    email,
    passwordLength: password.length,
    authLoaded: !!auth,
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white dark:bg-gray-900 min-h-screen">
      {/* IMAGE — hidden on mobile */}
      <div className="hidden md:flex items-center justify-center">
        <img
          src="habit-tracker-login.jpg"
          className="h-160 rounded-tl-[50px] rounded-bl-[50px]"
          alt="Habit Tracker"
        />
      </div>

      {/* FORM */}
      <form
        onSubmit={handleLogin}
        className="bg-[#D6CDEA] dark:bg-gray-800 px-6 sm:px-10 md:px-20 py-10 md:h-160 md:w-120 rounded-md md:rounded-tr-[50px] md:rounded-br-[50px] flex flex-col justify-center items-center w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-12 text-[#682860] dark:text-[#F6E27F] font-inter">
          Login
        </h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 sm:p-4 rounded-md bg-[#F8F8F8]/80 dark:bg-gray-700 dark:text-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 sm:p-4 rounded-md bg-[#F8F8F8]/80 dark:bg-gray-700 dark:text-gray-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full sm:w-[80%] bg-[#F6E27F] text-white py-3 sm:py-4 rounded-md font-bold dark:bg-[#682860]">
          Login
        </button>

        <p className="mt-4 text-center text-sm sm:text-[15px] text-gray-600 dark:text-gray-300">
          New here?{" "}
          <a href="/signup" className="text-red-600 dark:text-[#F6E27F] font-bold">
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
}
