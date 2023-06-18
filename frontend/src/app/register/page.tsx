"use client";
import {
  faLockOpen,
  faUser,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { inputStyle } from "../page";
import { API } from "../shared/api/api";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const register = async (e: any) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const newUser = await API.post("/users/register", {
          email: email,
          password: password,
        });
        console.log(newUser);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={register}
      className="w-full sm:max-w-sm bg-gray-50 sm:h-fit py-20 p-2 flex flex-col gap-4 justify-center sm:rounded-3xl px-10 relative shadow-lg m-auto h-screen"
    >
      <div className="bg-sky-900 sm:absolute -top-14 w-24 h-24 right-0 left-0 m-auto rounded-full flex justify-center items-center">
        <FontAwesomeIcon
          className="text-white ml-[15px]"
          icon={faUserEdit}
          size="3x"
        />
      </div>
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
      <input
        placeholder="Confirme sua senha"
        type="password"
        className={inputStyle}
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      <button
        type="submit"
        className="uppercase text-gray-50 bg-sky-900 p-3 sm:absolute -bottom-6 text-center left-0 right-0 m-auto w-fit px-12 rounded-3xl shadow-md hover:brightness-90"
      >
        registrar
      </button>
      <small className="uppercase text-gray-500 text-center">
        eu já tenho uma conta.{" "}
        <button
          className="text-sky-900 uppercase"
          onClick={() => router.push("/")}
        >
          clique aqui
        </button>
      </small>
    </form>
  );
}
