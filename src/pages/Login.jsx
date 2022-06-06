import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../features/authSlice";

function Login() {
  //TODO: navigate the user to the home page if they are already logged in
  // const { user } = useSelector((state) => state.auth);
  // if (user !== null) {
  //   return <div>You are logged in</div>;
  // }

  const [userDetails, setUserDetails] = React.useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    dispatch(userLogin(userDetails));
  };

  const dispatch = useDispatch();
  return (
    <main className="grow ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl my-6">Login</h1>
        <form
          className="flex flex-col border mx-1 rounded px-12 py-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="">username</label>
          <input
            className="py-2 px-1 my-2 text-black w-full rounded"
            type="text"
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
          />
          <label htmlFor="">Password</label>
          <input
            className="py-2 px-1 my-2 text-black w-full rounded"
            type="password"
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <label htmlFor="">
            <input type="checkbox" name="" id="" /> Remember me
          </label>
          <button
            className="w-full border bg-secondary text-paragraphDark hover:opacity-60 my-2 px-3 py-2 rounded"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
          <button
            className="w-full border bg-secondary text-paragraphDark  my-2 px-3 py-2 rounded hover:border-b-4"
            type="submit"
            onClick={() =>
              dispatch(
                userLogin({
                  username: "logan1x",
                  password: "meNhiBataunga",
                })
              )
            }
          >
            Test Credentials
          </button>
          <Link to="/signup">
            <p>Dont have account? Signup Here</p>
          </Link>
        </form>
      </div>
    </main>
  );
}

export { Login };
