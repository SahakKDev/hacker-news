import { Link, Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          HackerNews
        </Link>
        <Navigation />
      </header>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
