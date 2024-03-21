const HoverCard = ({text}) => {
  return (
    <div className="min-w-[300px] min-h-[50px] bg-black p-3 border-2 border-primary rounded-xl absolute top-[-100%] left-1/2 transform -translate-x-[20%] -translate-y-[25px]">
      <p className="text-center text-sm">{text}</p>
    </div>
  );
};

export default HoverCard;
