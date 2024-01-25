const Title = ({ level, text, size }) => {
  console.log(level, text, "hello");
  const TagName = `h${level || 1}`;
  return (
    <>
      <TagName className={`text-primary ${size} 9-xl`}>{text}</TagName>
    </>
  );
};

export default Title;
