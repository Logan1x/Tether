import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../features/postSlice";

function NewPost() {
  const { authToken, isAuth: authUserLoading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputState, setInputState] = useState({
    text: "",
    disableBtn: "",
    currTextLen: 250,
  });

  const handleChange = (e) => {
    const { value } = e.target;
    const currTextLen = 250 - parseInt(value.length);
    setInputState({
      text: value,
      disableBtn: currTextLen <= 0 ? true : false,
      currTextLen,
    });
  };

  const createNewPost = () => {
    if (inputState.text.length > 0) {
      authUserLoading
        ? dispatch(
            createPost({
              authToken,
              post: { content: inputState.text, comments: [] },
            })
          )
        : navigate("/login");
      setInputState({
        text: "",
        disableBtn: "",
        currTextLen: 250,
      });
    }
  };
  return (
    <div className="border shadow shadow-indigo-500/40 p-1 rounded">
      <textarea
        name=""
        id=""
        className="w-full p-2 rounded"
        placeholder="Whats on your mind today?"
        onChange={handleChange}
      ></textarea>
      <div className="flex justify-end items-center">
        <p
          className={
            inputState.currTextLen <= 10 ? "text-red-500 mx-2" : "mx-2"
          }
        >
          {inputState.currTextLen}
        </p>
        <button
          className={`bg-red-500 px-4 py-2 rounded text-lg disabled:bg-gray-500 disabled:cursor-not-allowed`}
          disabled={inputState.disableBtn}
          onClick={createNewPost}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export { NewPost };
