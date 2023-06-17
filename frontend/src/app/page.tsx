"use client";
import { API } from "./shared/api/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const inputStyle = "text-gray-700 outline-none px-1 border-b-2 border-blue-400";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e: any) => {
    e.preventDefault();
    try {
      const newUser = await API.post("/users/login", {
        email: email,
        password: password,
      });
      const { token } = newUser.data;
      localStorage.setItem("token", token);
      router.push("/tasks");
    } catch (error) {
      console.log(error);
    }
  };
  const teste = async () => {
    const a = await API.get("/tasks");
    console.log("tentei");
    console.log(a);
  };
  useEffect(() => {
    teste();
  }, []);
  return (
    <form
      onSubmit={login}
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
      <button
        type="submit"
        className="uppercase text-gray-50 bg-blue-400 w-fit mx-auto p-4 rounded"
      >
        sign up
      </button>
      <small className="uppercase text-gray-600 text-center">
        not have an account yet?{" "}
        <button
          className="text-blue-400 uppercase"
          onClick={() => router.push("/register")}
        >
          sign up
        </button>
      </small>
    </form>
  );
}
