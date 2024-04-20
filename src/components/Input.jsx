export default function Input({ tagName, label, id, ...props }) {
  const TagName = tagName;

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <TagName id={id} {...props} />
    </>
  );
}
