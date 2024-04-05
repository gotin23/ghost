"use client";
import Title from "@/components/Title/Title";
import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { performApiAction } from "@/Services/Api/Api";
import ValidationIcon from "../../../public/assets/icons/validation-success.svg";
import ValidationIconGreen from "../../../public/assets/icons/validation-success-green.svg";

const SignUp = () => {
  const [inputValue, setInputValue] = useState({ username: "", email: "", password: "", passwordConfirmation: "" });
  const [errorMessage, setErrorMessage] = useState("");

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
  const handlePasswordConfirmation = (value) => {
    setInputValue((state) => ({
      ...state,
      passwordConfirmation: value,
    }));
  };
  const handleEmail = (value) => {
    setInputValue((state) => ({
      ...state,
      email: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (inputValue.password === inputValue.passwordConfirmation && inputValue.passwordConfirmation.length >= 8) {
      try {
        const response = await performApiAction("signUp", null, {
          username: inputValue.username,
          password: inputValue.password,
          email: inputValue.email,
        });
        // Dispatch l'action setSignIn avec le token reçu de l'API
        // dispatch(setSignIn({ response }));
        // redirection vers son profile
        // navigate("/user");
        setErrorMessage("success");
        console.log(response);
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    } else {
      setErrorMessage("Please fill all fields correctly");
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center w-full">
      <section className="w-[680px]">
        <Title level={3} text="Sign up" style="text-primary text-6xl text-center mt-5 items-center justify-center " />
        <form className="flex flex-col p-10">
          <div className="flex justify-between ">
            <InputText
              type="text"
              id="Choose a username"
              value={inputValue.username}
              placeholder="5 characters minimum"
              autoFocus={true}
              onInputChange={handleUsername}
              style={"px-5"}
            />
            <InputText type="email" id="Enter your email" value={inputValue.email} placeholder="enter a valid @email" autoFocus={true} onInputChange={handleEmail} style={"px-5"} />
          </div>

          <div className="flex justify-between mt-10">
            <InputText type="password" id="Choose your password" value={inputValue.password} placeholder="your password" onInputChange={handlePassword} style={"px-5"} />
            <InputText
              type="password"
              id="Confirm your password"
              onInputChange={handlePasswordConfirmation}
              placeholder="comfirm your password"
              value={inputValue.passwordConfirmation}
              style={"px-5"}
            />
          </div>
          <p className="text-primary mt-10 mb-3 px-5 text-lg">Your password need:</p>
          <div className="flex justify-around px-5 mb-5">
            <div className="flex items-center  flex-col justify-center ">
              <p className="text-primary  mb-1 text-sm ">Uppercase</p>
              {/\p{Lu}/u.test(inputValue.password) ? (
                <Image src={ValidationIconGreen} width={18} alt="validation icon" />
              ) : (
                <Image src={ValidationIcon} width={18} alt="validation icon" />
              )}
            </div>
            <div className="flex items-center flex-col justify-center ">
              <p className="text-primary mr-2 mb-1 text-sm">Number</p>
              {/\d/.test(inputValue.password) ? (
                <Image src={ValidationIconGreen} width={18} alt="validation icon" />
              ) : (
                <Image src={ValidationIcon} width={18} alt="validation icon" />
              )}
            </div>
            <div className="flex items-center flex-col justify-center ">
              <p className="text-primary mr-2 mb-1 text-sm">8 characters min</p>
              {inputValue.password.length >= 8 ? (
                <Image src={ValidationIconGreen} width={18} alt="validation icon" />
              ) : (
                <Image src={ValidationIcon} width={18} alt="validation icon" />
              )}
            </div>
            <div className="flex items-center flex-col justify-center ">
              <p className="text-primary mr-2 mb-1 text-sm">Confirmation</p>
              {inputValue.password === inputValue.passwordConfirmation && inputValue.password.length >= 8 ? (
                <Image src={ValidationIconGreen} width={18} alt="validation icon" />
              ) : (
                <Image src={ValidationIcon} width={18} alt="validation icon" />
              )}
            </div>
          </div>

          <p className="text-primary mt-3 px-5 min-h-[24px] text-center">{errorMessage}</p>
          <div className="flex justify-around mt-5">
            <Button type={"submit"} text={"Sign Up"} style={"w-[50%]"} onClick={handleSignUp} />
          </div>
          <Link href={"/login"} className="text-primary text-lg text-center mt-5 hover:text-primaryHover">
            already a account?
          </Link>
        </form>
      </section>
    </main>
  );
};

export default SignUp;
