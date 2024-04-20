// import ArrowUp from "../ArrowUp";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { isAuthenticated } from "../../helpers";

export default function Link({ link, index }) {
  const isLoggedIn = isAuthenticated();

  return (
    <li className="link mb-1">
      <div className="row">
        <span>{index}.</span>
        {isLoggedIn && <ArrowUpIcon className="icon" />}
        {link.description} ({link.url})
      </div>
      <div className="row ml-1">
        <span>[0] Votes</span> | <span>By [Unknown]</span>
        <span>[2 days ago]</span>
      </div>
    </li>
  );
}
