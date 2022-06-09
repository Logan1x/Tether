import { useState } from "react";
import { Link } from "react-router-dom";

function NewPost() {
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
        <Link to="/">
          <button
            className={`bg-red-500 px-4 py-2 rounded text-lg disabled:bg-gray-500 disabled:cursor-not-allowed`}
            disabled={inputState.disableBtn}
          >
            Post
          </button>
        </Link>
      </div>
    </div>
  );
}

export { NewPost };
