import React from "react";
import { VscTypeHierarchy } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex flex-none justify-between items-center px-6 h-16 py-2 text-lg bg-secondary text-paragraphDark">
      <Link to="/">
        <p className="text-xl font-semibold flex items-center">
          <span className="px-1">
            <VscTypeHierarchy />
          </span>{" "}
          Tether
        </p>
      </Link>
      <div className="flex justify-center">
        <Link to="/">
          <p className="px-1">Home</p>
        </Link>
        <Link to="/explore">
          <p className="px-1">Explore</p>
        </Link>
        <Link to="/profile">
          <p className="px-1">Profile</p>
        </Link>
      </div>
    </nav>
  );
}

export { Nav };
