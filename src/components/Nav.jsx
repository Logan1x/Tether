import { useState } from "react";
import { VscTypeHierarchy } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Nav() {
  const { isAuth, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState("hidden");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };
  return (
    <nav className="flex-none justify-center px-6 text-lg bg-secondary text-paragraphDark">
      <div className="flex justify-between items-center w-full h-16">
        <Link to="/">
          <p className="text-xl font-semibold flex items-center">
            <span className="px-1">
              <VscTypeHierarchy />
            </span>{" "}
            Tether
          </p>
        </Link>
        <div className="hidden md:flex justify-center items-center">
          <Link to="/">
            <p className="px-1">Home</p>
          </Link>
          <Link to="/explore">
            <p className="px-1">Explore</p>
          </Link>
          <Link to={isAuth ? `/profile/${user.username}` : `/login`}>
            <p className="px-1">Profile</p>
          </Link>
          {isAuth ? (
            <p
              className="px-2 mx-2 bg-primary text-paragraphLight py-1 rounded cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </p>
          ) : (
            <Link to="/login">
              <p className="px-2 mx-2 bg-primary text-paragraphLight py-1 rounded cursor-pointer">
                Login
              </p>
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center">
          {isAuth ? (
            <p
              className="px-2 mx-2 bg-primary text-paragraphLight py-1 rounded"
              onClick={handleLogout}
            >
              Logout
            </p>
          ) : (
            <Link to="/login">
              <p className="px-2 mx-2 bg-primary text-paragraphLight py-1 rounded">
                Login
              </p>
            </Link>
          )}
          <button
            onClick={() => {
              setIsOpen(isOpen === "hidden" ? "" : "hidden");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={`${isOpen} pb-4 md:hidden`}>
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
