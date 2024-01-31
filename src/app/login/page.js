"use client";
import Title from "@/components/Title/Title";
import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { performApiAction } from "@/Services/Api/Api";
import { setLogin } from "@/redux/Reducers/LogReducer";

const Login = () => {
  const [inputValue, setInputValue] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

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

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await performApiAction("login", null, {
        username: inputValue.username,
        password: inputValue.password,
      });
      // Dispatch l'action setSignIn avec le token reçu de l'API
      dispatch(setLogin({ response }));
      // redirection vers son profile
      // navigate("/user");
      console.log(response);
    } catch (error) {
      // Gérer les erreurs de la requête API
      console.log(error);
      setErrorMessage("Username or password incorrect");
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center w-full">
      <section className="w-[420px] min-h-[600px]  rounded-lg">
        <Title level={3} text="Login" style="text-6xl text-center mt-5 items-center justify-center" />
        <form className="flex flex-col p-10">
          <InputText type="text" id="Username" placeholder="Enter your username" autoFocus={true} onInputChange={handleUsername} />
          <InputText type="password" id="Password" placeholder="Enter your password" onInputChange={handlePassword} style={"mt-5"} />
          <p className="text-primary mt-3">{errorMessage}</p>
          <div className="mt-10 px-10">
            <Button type={"submit"} text={"Login"} style={"w-[100%]"} onClick={handleSignIn} />
          </div>
          <Link href={"/signup"} className="text-primary text-lg text-center mt-5 hover:text-primaryHover">
            No account yet?
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Login;
