const Button = ({ type, text, onClick, style }) => {
  return (
    <>
      <button className={`${style} py-1 poppins rounded-lg  bg-primary text-lg  min-w-40 hover:bg-primaryHover `} type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
