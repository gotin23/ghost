const Title = ({ level, text, style }) => {
  const TagName = `h${level || 1}`;

  return (
    <>
      <TagName className={`${style} text-primary`}>{text}</TagName>
    </>
  );
};

export default Title;
