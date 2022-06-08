import { useState, useEffect } from "react";
import {
  MdBookmarkAdd,
  MdBookmarkAdded,
  MdOutlineInsertComment,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Discover, NewPost } from "../components";
import { getPosts } from "../features/postSlice";
import { getAllUsers } from "../features/userSlice";

function Explore() {
  const dispatch = useDispatch();
  const { authToken, isAuth: authUserLoading } = useSelector(
    (state) => state.auth
  );
  const { posts, postsLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    authToken !== null && dispatch(getAllUsers({ authToken }));
  }, [authUserLoading]);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <main className="grow w-full md:w-1/3 mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="grow">
          <h1 className="text-2xl text-center py-2">Explore</h1>
          <NewPost />
          <div>
            <Discover />
          </div>
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
      </div>
    </main>
  );
}

export { Explore };
