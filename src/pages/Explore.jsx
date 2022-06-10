import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Discover, NewPost, PostCard } from "../components";
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
    <main className="grow w-full md:w-1/3 mx-auto relative">
      <div className="flex flex-col md:flex-row">
        <div className="grow">
          <h1 className="text-2xl text-center py-2">Explore</h1>
          <NewPost />
          <div>
            <Discover />
          </div>
          <div>
            {postsLoading ? (
              <>
                {posts.map((post) => (
                  <PostCard key={post._id} data={post} />
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export { Explore };
