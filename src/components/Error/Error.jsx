export default function Error({ children }) {
  return (
    <div className="center error">{children || "Something went wrong!"}</div>
  );
}
