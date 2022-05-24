import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <main className="grow ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl my-6">Signup</h1>
        <form className="flex flex-col border mx-1 rounded px-12 py-6">
          <label htmlFor="">Username</label>
          <input
            className="py-2 px-1 my-2 text-black w-full rounded"
            type="text"
          />
          <label htmlFor="">Email</label>
          <input
            className="py-2 px-1 my-2 text-black w-full rounded"
            type="email"
          />
          <label htmlFor="">Password</label>
          <input
            className="py-2 px-1 my-2 text-black w-full rounded"
            type="password"
          />
          <label htmlFor="">
            <input type="checkbox" name="" id="" /> Remember me
          </label>
          <button
            className="w-full border bg-secondary text-paragraphDark hover:opacity-60 my-2 px-3 py-2 rounded"
            type="submit"
          >
            Login
          </button>
          <Link to="/signup">
            <p>Already have an account? Login Here</p>
          </Link>
        </form>
      </div>
    </main>
  );
}

export { Signup };
