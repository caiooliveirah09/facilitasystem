"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API } from "../shared/api/api";
const inputStyle = "text-gray-700 outline-none px-1 border-b-2 border-blue-400";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const register = async (e: any) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const newUser = await API.post("/users", {
          email: email,
          password: password,
        });
        console.log(newUser);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={register}
      className="w-full max-w-md bg-gray-50 h-96 p-2 flex flex-col gap-4 justify-center"
    >
      <h1 className="text-blue-400 text-center text-4xl">Create Account</h1>
      <input
        type="text"
        className={inputStyle}
        placeholder="digite aqui seu email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        placeholder="digite aqui sua senha"
        type="password"
        className={inputStyle}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input
        placeholder="confirme sua senha"
        type="password"
        className={inputStyle}
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      <button
        type="submit"
        className="uppercase text-gray-50 bg-blue-400 w-fit mx-auto p-4 rounded"
      >
        sign up
      </button>
      <small className="uppercase text-gray-600 text-center">
        already have an account?{" "}
        <button
          className="text-blue-400 uppercase"
          onClick={() => router.push("/")}
        >
          log in
        </button>
      </small>
    </form>
  );
}
