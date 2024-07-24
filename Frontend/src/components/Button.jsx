import { Link } from "react-router-dom";

export default function Button({
  type = "primary",
  className,
  children,
  to,
  onClick,
}) {
  if (!to)
    return (
      <button onClick={onClick} className={`btn btn-${type} me-2`}>
        {children}
      </button>
    );

  return (
    <Link
      onClick={onClick}
      to={to}
      className={`btn btn-${type} ${className} me-2`}
    >
      {children}
    </Link>
  );
}
