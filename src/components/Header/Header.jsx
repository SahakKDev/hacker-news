import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Logout from "./Logout";

export default function Header() {
  return (
    <>
      <header className="header">
        <span className="logo">HackerNews</span>
        <Navigation />
        <Logout />
      </header>
      <Outlet />
    </>
  );
}
