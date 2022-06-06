import React from "react";

function Profile() {
  return (
    <main className="grow w-full md:w-1/3 mx-1 md:mx-auto text-lg">
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center divide-x divide-indigo-500/40 my-4 rounded shadow shadow-indigo-500/40 py-6 bg-primaryDark ">
        <img
          className="w-40 rounded-full mx-4"
          src="https://picsum.photos/300"
          alt="profile photo"
        />
        <div className="px-4">
          <h1 className="text-xl">Khushal Sharma</h1>
          <p className="text-sm">Engineer at Netflix</p>
          <p>https://logan1x.github.io</p>
          <div className="flex space-x-1 my-2">
            <p>6 posts</p>
            <p>2 followers</p>
            <p>3 following</p>
          </div>
          <button className="bg-red-500 px-3 py-2 rounded w-full text-lg">
            Logout
          </button>
        </div>
      </div>
      <div className="flex bg-primaryDark justify-around py-2 rounded shadow shadow-indigo-500/40">
        <p>posts</p>
        <p>bookmarks</p>
        <p>activity</p>
      </div>
      <div className="flex my-2 p-3 bg-primaryDark shadow shadow-indigo-500/40 rounded hover:shadow">
        <div className="w-1/8 mx-2">
          <img
            className="w-40 rounded-full"
            src="https://picsum.photos/200"
            alt="profile photo"
          />
        </div>
        <div className="flex flex-col w-7/8">
          <h1>Khushal Sharma</h1>
          <p className="text-xs">Engineer at netflix</p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            animi voluptates tempora aperiam quaerat et eligendi odio voluptate
            obcaecati exercitationem, nisi corporis harum saepe! Facilis
            veritatis quis labore quae modi.
          </p>
        </div>
      </div>
    </main>
  );
}

export { Profile };
