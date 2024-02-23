const Title = ({ level, text, style }) => {
  const TagName = `h${level || 1}`;

  return (
    <>
      <TagName className={`poppins ${style}`}>{text}</TagName>
    </>
  );
};

export default Title;
