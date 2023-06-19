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
export const styleInputError = "bg-red-300";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const register = async (e: any) => {
    e.preventDefault();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      setEmailError(true);
    else setEmailError(false);
    if (password.length < 6) setPasswordError(true);
    else setPasswordError(false);
    if (confirmPassword !== password || confirmPassword.length < 6)
      setConfirmPasswordError(true);
    else setConfirmPasswordError(false);
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      password.length >= 6 &&
      confirmPassword.length >= 6 &&
      confirmPassword === password
    ) {
      try {
        const newUser = await API.post("/users/createNewUser/", {
          email: email,
          password: password,
        });
        console.log(newUser);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
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
          className={`${inputStyle} ${emailError && styleInputError}`}
          placeholder="Digite aqui seu email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="flex relative items-center">
        <input
          placeholder="Digite aqui sua senha"
          type="password"
          className={`${inputStyle} ${passwordError && styleInputError}`}
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
        className={`${inputStyle} ${confirmPasswordError && styleInputError}`}
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      <div className="flex flex-col text-red-600">
        {emailError && <small>por favor, digite um email válido!</small>}
        {passwordError && (
          <small>por favor, digite uma senha maior do que 6 dígitos!</small>
        )}
        {confirmPasswordError && (
          <small>por favor, confirme que as duas senhas estão iguais!</small>
        )}
      </div>
      <button
        type="submit"
        className="uppercase text-gray-50 bg-sky-900 p-3 sm:absolute -bottom-6 text-center left-0 right-0 m-auto w-fit px-12 rounded-3xl shadow-md hover:brightness-90"
      >
        registrar
      </button>
      <small className="uppercase text-gray-500 text-center">
        eu já tenho uma conta.{" "}
        <button
          type="button"
          className="text-sky-900 uppercase"
          onClick={() => router.push("/")}
        >
          clique aqui
        </button>
      </small>
    </form>
  );
}
