import React, { useState } from "react";

const InputText = ({ onInputChange, id, type, placeholder, autoFocus }) => {
  //   const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    // setInputValue(value);

    // Propagez la valeur vers le composant parent
    onInputChange(value);
  };

  return (
    <div className="flex flex-col mt-5">
      <label className="text-xl text-primary mt-3" htmlFor={id}>
        {id}
      </label>
      <input
        className="py-2 px-3 rounded-lg mt-3 outline-8 outline-offset-2 outline-primary"
        type={type}
        placeholder={placeholder}
        id={id}
        autoFocus={autoFocus}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputText;
