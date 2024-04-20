import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";
import { isAuthenticated } from "../../helpers";

export default function Navigation() {
  const isLoggedIn = isAuthenticated();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem(AUTH_TOKEN);
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/new">New</Link>
        </li>
        <span>|</span>
        <li className="nav-list-item">
          <Link to="/search">Search</Link>
        </li>
        {isLoggedIn && (
          <>
            <span>|</span>
            <li className="nav-list-item">
              <Link to="/submit">Submit</Link>
            </li>
          </>
        )}
      </ul>

      <button className="button ml-auto" onClick={handleClick}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </nav>
  );
}
