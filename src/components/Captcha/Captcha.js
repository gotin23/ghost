"use client";
import { useState } from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

const Captcha = () => {
  const [value, setValue] = useState("");
  const randomNumber1 = Math.floor(Math.random() * 10);
  const randomNumber2 = Math.floor(Math.random() * 10);
  const CaptchaValue = (value) => {
    setValue(value);
  };
  const handleAnswer = (e) => {
    const result = randomNumber1 + randomNumber2 === parseInt(value, 10);
  };

  return (
    <div>
      <InputText type="number" id={`Captcha ${randomNumber1} + ${randomNumber2} = ?`} placeholder="your awnser" onInputChange={CaptchaValue} />
      <Button type={"button"} text={"Validate"} onClick={handleAnswer} />
    </div>
  );
};

export default Captcha;
