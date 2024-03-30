const InputText = ({ onInputChange, value, id, type, placeholder, autoFocus, style }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    onInputChange(value);
  };

  return (
    <div className={`flex flex-col  w-full ${style}`}>
      <label className="text-lg text-primary  poppins text-start" htmlFor={id}>
        {id}
      </label>
      <input
        className="py-2 px-2 rounded-lg mt-2 outline-8 outline-offset-2 outline-primary poppins text-sm"
        type={type}
        value={value}
        placeholder={placeholder}
        id={id}
        autoFocus={autoFocus}
        onChange={handleInputChange}
        autoComplete="on"
      />
    </div>
  );
};

export default InputText;
