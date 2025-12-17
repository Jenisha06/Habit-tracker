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
  authLoaded: !!auth
});

  return (
    <div className=" flex flex-row items-center justify-center bg-white h-[100vh] ">

    <div className=" flex items-center justify-center ">
        <img src="habit-tracker-login.jpg " className="h-160  rounded-tl-[50px] rounded-bl-[50px]"></img>
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-[#D6CDEA] px-20 h-160 w-120 rounded-tr-[50px] rounded-br-[50px]  flex flex-col justify-center items-center  "
      >
        <h2 className="text-3xl font-bold mb-12  text-[#682860] font-inter">
          Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-4  rounded-md bg-[#F8F8F8]/80"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-4  rounded-md bg-[#F8F8F8]/80"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-[80%]  bg-[#F6E27F] text-white py-4 rounded-md font-bold"
        >
          Login
        </button>

        <p className="mt-3 text-center text-[15px] text-gray-600">
          New here?{" "}
          <a href="/signup" className="text-red-600 font-bold">
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
}
