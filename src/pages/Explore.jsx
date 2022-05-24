import React from "react";
import {
  MdBookmarkAdd,
  MdBookmarkAdded,
  MdOutlineInsertComment,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";

function Explore() {
  return (
    <main className="grow w-full md:w-1/2 mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="grow">
          <h1 className="text-2xl text-center py-2">Explore</h1>

          <div>{/* input box */}</div>
          <div>
            {/* card1 starts */}

            <div className="flex w-full  mx-auto py-2 bg-primaryDark shadow shadow-indigo-500/40 rounded px-2 ">
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi animi voluptates tempora aperiam quaerat et eligendi
                  odio voluptate obcaecati exercitationem, nisi corporis harum
                  saepe! Facilis veritatis quis labore quae modi.
                </p>
              </div>
            </div>
            {/* card1 ends */}
            <div className="flex w-full mx-auto py-2 bg-primaryDark shadow shadow-indigo-500/40 rounded my-2">
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi animi voluptates tempora aperiam quaerat et eligendi
                  odio voluptate obcaecati exercitationem, nisi corporis harum
                  saepe! Facilis veritatis quis labore quae modi.
                </p>
                <div className="text-xl">
                  <button className="hover:text-white">
                    <MdFavoriteBorder />
                  </button>
                  {/* MdFavoriteBorder when liked */}
                  <button className="hover:text-white">
                    <MdOutlineInsertComment />
                  </button>
                  <button className="hover:text-white">
                    <MdBookmarkAdd />
                  </button>
                  {/* if bookmarked use `MdBookmarkAdded` */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-none px-2 ">
          <p className="text-center py-2">Follow these</p>
          <div className="flex  mx-auto">
            <div className="w-1/8 mx-2">
              <img
                className="w-12 rounded-full"
                src="https://picsum.photos/200"
                alt=""
              />
            </div>
            <div className="flex flex-col w-7/8 ">
              <h1>Khushal Sharma</h1>
              <p className="text-xs">Engineer at netflix</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { Explore };
