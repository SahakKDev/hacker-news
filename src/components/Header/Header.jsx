import { Link, Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/new" className="logo">
          HackerNews
        </Link>
        <Navigation />
      </header>
      <Outlet />
    </>
  );
}
