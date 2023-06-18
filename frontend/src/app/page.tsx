"use client";
import { API } from "./shared/api/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faLock,
  faLockOpen,
  faUser,
  faUserAlt,
  faUserAstronaut,
  faUserCircle,
  faUserLarge,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";

export const inputStyle =
  "text-gray-500 outline-none w-full text-center shadow focus:shadow-lg py-2 placeholder-gray-500 rounded bg-sky-100";

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
      className="w-full sm:max-w-sm bg-gray-50 sm:h-fit py-20 p-2 flex flex-col gap-4 justify-center sm:rounded-3xl px-10 relative shadow-lg m-auto h-screen"
    >
      <div className="bg-white absolute -top-10 w-8 h-10 right-0 left-0 m-auto"></div>
      <FontAwesomeIcon
        className="text-sky-900 sm:absolute -top-14 m-auto right-0 left-0"
        icon={faUserCircle}
        size="6x"
      />
      <div className="flex relative items-center">
        <FontAwesomeIcon
          className="absolute text-sky-900 start-1"
          icon={faUser}
          size="2x"
        />
        <input
          type="text"
          className={inputStyle}
          placeholder="Digite aqui seu email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="flex relative items-center">
        <input
          placeholder="Digite aqui sua senha"
          type="password"
          className={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <FontAwesomeIcon
          className="absolute text-sky-900 end-1"
          icon={faLockOpen}
          size="2x"
        />
      </div>
      <button
        type="submit"
        className="uppercase text-gray-50 bg-sky-900 p-3 sm:absolute -bottom-6 text-center left-0 right-0 m-auto w-fit px-12 rounded-3xl shadow-md hover:brightness-90"
      >
        entrar
      </button>
      <small className="uppercase text-gray-500 text-center">
        não tem uma conta?{" "}
        <button
          className="text-sky-900 uppercase"
          onClick={() => router.push("/register")}
        >
          clique aqui
        </button>
      </small>
    </form>
  );
}
