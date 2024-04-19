import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/">New</Link>
        </li>
        <span>|</span>
        <li className="nav-list-item">
          <Link to="/submit">Submit</Link>
        </li>
      </ul>
    </nav>
  );
}
