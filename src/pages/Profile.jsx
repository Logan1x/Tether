import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, profileUpdate } from "../features/userProfileSlice";
import { editProfile } from "../features/authSlice";
import { MdClose } from "react-icons/md";

function Profile() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => state.auth);
  const [modalClass, setModalClass] = useState("hidden");
  const { userProfileLoading, userProfileData } = useSelector(
    (state) => state.userProfile
  );
  const [updateUserData, setUpdateUserData] = useState({
    username: userProfileData.username,
    firstName: userProfileData.firstName,
    lastName: userProfileData.lastName,
    bio: userProfileData.bio,
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editProfile(updateUserData));
    dispatch(profileUpdate(updateUserData));
    // TODO: update profile
    setModalClass(modalClass === "" ? "hidden" : "");
  };

  useEffect(() => {
    dispatch(getUserProfile({ authToken, username }));
  }, [dispatch, username]);

  return (
    userProfileLoading && (
      <main className="grow w-full md:w-1/3 mx-1 md:mx-auto text-lg">
        <div className="flex flex-wrap md:flex-nowrap justify-center items-center md:divide-x divide-indigo-500/40 my-4 rounded shadow shadow-indigo-500/40 py-6 bg-primaryDark ">
          <img
            className="w-40 rounded-full mx-4"
            src="https://picsum.photos/300"
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
              <p>6 posts</p>
              <p>{userProfileData.followers.length} followers</p>
              <p>{userProfileData.following.length} following</p>
            </div>
            <button
              className="bg-red-500 px-3 py-2 rounded w-full text-lg"
              onClick={() => setModalClass(modalClass === "" ? "hidden" : "")}
            >
              Edit Profile
            </button>
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
              <label htmlFor="">First Name</label>
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
              <label htmlFor="">Last Name</label>
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
              <label htmlFor="">Username</label>
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
              <label htmlFor="">Bio</label>
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
              animi voluptates tempora aperiam quaerat et eligendi odio
              voluptate obcaecati exercitationem, nisi corporis harum saepe!
              Facilis veritatis quis labore quae modi.
            </p>
          </div>
        </div>
      </main>
    )
  );
}

export { Profile };
