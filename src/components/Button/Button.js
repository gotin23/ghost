const Button = ({ type, text }) => {
  return (
    <>
      <button className="py-1 rounded-lg bg-primary text-lg  min-w-40" type={type}>
        {text}
      </button>
    </>
  );
};

export default Button;
