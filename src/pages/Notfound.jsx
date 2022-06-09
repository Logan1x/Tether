import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <main className="grow flex items-center justify-center text-4xl">
      <h1>
        You're drunk, Go{" "}
        <span className="text-gray-200 hover:underline cursor-pointer">
          <Link to="/">home</Link>
        </span>
        .{" "}
      </h1>
    </main>
  );
}

export { Notfound };
