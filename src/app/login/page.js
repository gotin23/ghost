"use client";
import Title from "@/components/Title/Title";
import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [inputValue, setInputValue] = useState({ username: "", password: "" });
  console.log(inputValue);

  const handleUsername = (value) => {
    setInputValue((state) => ({
      ...state,
      username: value,
    }));
  };

  const handlePassword = (value) => {
    setInputValue((state) => ({
      ...state,
      password: value,
    }));
  };

  return (
    <main className="flex min-h-screen justify-center items-center w-full">
      <section className="w-[420px] min-h-[600px]  rounded-lg">
        <Title level={3} text="Login" style="text-4xl text-center mt-5 items-center justify-center" />
        <form className="flex flex-col p-10">
          <InputText type="text" id="Username" placeholder="Enter your username" autoFocus={true} onInputChange={handleUsername} />
          <InputText type="password" id="Password" placeholder="Enter you password" onInputChange={handlePassword} />
          <div className="flex  justify-between mt-10">
            <Link href={"/login"}>
              <Button type={"button"} text={"Login"} />
            </Link>
            <Link href={"/login"}>
              <Button type={"button"} text={"Sign Up"} />
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
