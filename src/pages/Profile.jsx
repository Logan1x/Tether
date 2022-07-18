import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, profileUpdate } from "../features/userProfileSlice";
import { getAllUsers } from "../features/userSlice";
import { getPosts, getBookmarks } from "../features/postSlice";
import { editProfile } from "../features/authSlice";
import { MdClose } from "react-icons/md";
import { PostCard } from "../components/PostCard";
import { postFollowUser } from "../features/userSlice";

function Profile() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { authToken, user } = useSelector((state) => state.auth);
  const [modalClass, setModalClass] = useState("hidden");
  const { userProfileLoading, userProfileData } = useSelector(
    (state) => state.userProfile
  );

  const { users } = useSelector((state) => state.users);

  const currUser = users.filter((user) => user.username === username)[0];

  const bookmarksArr = useSelector((state) => state.posts.bookmarks);

  const [updateUserData, setUpdateUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
  });

  const [stateInfo, setStateInfo] = useState({
    follow: false,
    followText: (
      <button
        className="bg-red-500 px-3 py-2 rounded w-full text-lg"
        onClick={() => handleFollow()}
      >
        Follow
      </button>
    ),
    firstRender: true,
  });

  const updateState = () => {
    setUpdateUserData({
      username: userProfileData.username,
      firstName: userProfileData.firstName,
      lastName: userProfileData.lastName,
      bio: userProfileData.bio,
    });
  };

  const [showTab, setShowTab] = useState("posts");

  const { posts } = useSelector((state) => state.posts);

  const filteredPosts = posts.filter((post) => post.username === username);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editProfile(updateUserData));
    dispatch(profileUpdate(updateUserData));
    setModalClass(modalClass === "" ? "hidden" : "");
  };

  const handleFollow = (username) => {
    dispatch(postFollowUser({ authToken, username }));
    setStateInfo({
      ...stateInfo,
      follow: true,
      firstRender: false,
      followText: (
        <button
          className="bg-red-500 px-3 py-2 rounded w-full text-lg"
          onClick={() => handleUnfllow(username)}
        >
          Unfollow
        </button>
      ),
    });
  };

  const handleUnfllow = (username) => {
    dispatch(postFollowUser({ authToken, username }));
    setStateInfo({
      ...stateInfo,
      follow: false,
      firstRender: false,
      followText: (
        <button
          className="bg-red-500 px-3 py-2 rounded w-full text-lg"
          onClick={() => handleFollow(username)}
        >
          Follow
        </button>
      ),
    });
  };

  useEffect(() => {
    dispatch(getUserProfile({ authToken, username }));
    dispatch(getPosts());
    dispatch(getAllUsers());
    dispatch(getBookmarks({ authToken }));
    updateState();
  }, []);

  return userProfileLoading ? (
    <main className="grow w-full md:w-1/3 mx-1 md:mx-auto text-lg">
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center md:divide-x divide-indigo-500/40 my-4 rounded shadow shadow-indigo-500/40 py-6 bg-primaryDark ">
        <img
          className="w-40 rounded-full mx-4"
          src={userProfileData.avatar}
          alt="profile photo"
        />
        <div className="px-4">
          <h1 className="text-xl">{`${userProfileData.firstName} ${userProfileData.lastName}`}</h1>
          <p className="text-sm">{`Username: ${userProfileData.username}`}</p>
          <p className="text-sm">
            {userProfileData.bio !== undefined
              ? `Bio: ${userProfileData.bio}`
              : ""}
          </p>
          <div className="flex space-x-1 my-2">
            <p>{filteredPosts.length} posts</p>
            <p>{userProfileData.followers.length} followers</p>
            <p>{userProfileData.following.length} following</p>
          </div>
          {user.username === username ? (
            <button
              className="bg-red-500 px-3 py-2 rounded w-full text-lg"
              onClick={() => setModalClass(modalClass === "" ? "hidden" : "")}
            >
              Edit Profile
            </button>
          ) : (
            <>
              {stateInfo.firstRender ? (
                <button
                  className="bg-red-500 px-3 py-2 rounded w-full text-lg"
                  onClick={() => handleFollow(userProfileData.username)}
                >
                  Follow
                </button>
              ) : (
                stateInfo.followText
              )}
            </>
          )}
        </div>
      </div>

      <div
        className={`${modalClass} absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center h-full bg-gray-700/40 `}
      >
        <div className="p-4 bg-secondary text-paragraphDark rounded">
          <div className="text-2xl flex w-full justify-between items-center px-2 py-2 font-bold">
            <h1>Profile Details</h1>
            <MdClose
              className="hover:bg-red-500/80 rounded-full cursor-pointer"
              onClick={() => setModalClass(modalClass === "" ? "hidden" : "")}
            />
          </div>
          <form className="flex flex-col border mx-1 rounded px-12 py-6">
            <label htmlFor="first name">First Name</label>
            <input
              className="py-2 px-1 my-2 text-black w-full rounded"
              type="text"
              value={updateUserData.firstName}
              onChange={(e) =>
                setUpdateUserData({
                  ...updateUserData,
                  firstName: e.target.value,
                })
              }
            />
            <label htmlFor="last name">Last Name</label>
            <input
              className="py-2 px-1 my-2 text-black w-full rounded"
              type="text"
              value={updateUserData.lastName}
              onChange={(e) =>
                setUpdateUserData({
                  ...updateUserData,
                  lastName: e.target.value,
                })
              }
            />
            <label htmlFor="username">Username</label>
            <input
              className="py-2 px-1 my-2 text-black w-full rounded"
              type="text"
              value={updateUserData.username}
              onChange={(e) =>
                setUpdateUserData({
                  ...updateUserData,
                  username: e.target.value,
                })
              }
            />
            <label htmlFor="Bio">Bio</label>
            <textarea
              className="py-2 px-1 my-2 text-black w-full rounded"
              type="text"
              value={updateUserData.bio}
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, bio: e.target.value })
              }
            />
            <button
              className="w-full border bg-primaryDark text-paragraphLight hover:opacity-80 my-2 px-3 py-2 rounded"
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        </div>
      </div>

      <div className="flex bg-primaryDark justify-around py-2 rounded shadow shadow-indigo-500/40">
        <p className="cursor-pointer" onClick={() => setShowTab("posts")}>
          posts
        </p>
        <p className="cursor-pointer" onClick={() => setShowTab("bookmarks")}>
          bookmarks
        </p>
      </div>

      {showTab === "posts" ? (
        <div className="flex flex-col justify-center items-center">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post._id}
                data={{ username, content: post.content }}
                className="flex my-2 p-3 bg-primaryDark shadow shadow-indigo-500/40 rounded hover:shadow"
              />
            ))
          ) : (
            <p className="py-2">No posts yet</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {bookmarksArr.length > 0 ? (
            bookmarksArr.map((post) => (
              <PostCard
                key={post._id}
                data={{ username: post.username, content: post.content }}
                className="flex my-2 p-3 bg-primaryDark shadow shadow-indigo-500/40 rounded hover:shadow"
              />
            ))
          ) : (
            <p className="py-2">No bookmarks yet</p>
          )}
        </div>
      )}
    </main>
  ) : (
    <main className="grow w-full md:w-1/3 mx-1 md:mx-auto text-lg">
      <p className="text-center my-6">Loading...</p>
    </main>
  );
}

export { Profile };
