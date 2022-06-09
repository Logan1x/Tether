import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSignUp } from "../features/authSlice";

function Signup() {
  const [userSignupDetails, setUserSignupDetails] = React.useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignUp(userSignupDetails));
  };
  const dispatch = useDispatch();
  return (
    <main className="grow ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl my-6">Signup</h1>
        <form
          className="flex flex-col border mx-1 rounded px-12 py-6"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Username</label>
          <input
            className="py-2 px-1 my-2 text-black w-full rounded"
            type="text"
            onChange={(e) =>
              setUserSignupDetails({
                ...userSignupDetails,
                username: e.target.value,
              })
            }
          />
          <label htmlFor="email">Email</label>
          <input
            className="py-2 px-1 my-2 text-black w-full rounded"
            type="email"
            onChange={(e) =>
              setUserSignupDetails({
                ...userSignupDetails,
                email: e.target.value,
              })
            }
          />
          <label htmlFor="password">Password</label>
          <input
            className="py-2 px-1 my-2 text-black w-full rounded"
            type="password"
            onChange={(e) =>
              setUserSignupDetails({
                ...userSignupDetails,
                password: e.target.value,
              })
            }
          />
          <button
            className="w-full border bg-secondary text-paragraphDark hover:opacity-60 my-2 px-3 py-2 rounded"
            type="submit"
          >
            Login
          </button>

          <Link to="/login">
            <p>Already have an account? Login Here</p>
          </Link>
        </form>
      </div>
    </main>
  );
}

export { Signup };
