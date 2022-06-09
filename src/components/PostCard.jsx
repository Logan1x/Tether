import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../features/userSlice";
import {
  dislikePost,
  likePost,
  bookmarkPost,
  editPost,
  deletePost,
} from "../features/postSlice";

import {
  MdBookmarkAdd,
  MdBookmarkAdded,
  MdOutlineInsertComment,
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineEdit,
  MdOutlineDelete,
  MdClose,
} from "react-icons/md";

function PostCard({ data }) {
  const dispatch = useDispatch();
  const { authToken, user: authUser } = useSelector((state) => state.auth);
  const { postsLoading } = useSelector((state) => state.posts);
  const { users, userLoading } = useSelector((state) => state.users);
  const [modalClass, setModalClass] = useState("hidden");
  const user = users.filter((user) => user.username === data.username)[0];

  const [updatePostData, setUpdatePostData] = useState("");

  const handleEditPost = (e) => {
    e.preventDefault();
    dispatch(
      editPost({ authToken, post: { ...data, content: updatePostData } })
    );
    setModalClass(modalClass === "" ? "hidden" : "");
    setUpdatePostData("");
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost({ authToken, postId }));
  };

  const handleLike = (postId) => {
    dispatch(likePost({ authToken, postId }));
    checkLikedByUser();
  };

  const handleDislike = (postId) => {
    dispatch(dislikePost({ authToken, postId }));
  };

  // TODO: Handle remove bookmark

  const handleBookmarkAdd = (postId) => {
    dispatch(bookmarkPost({ authToken, postId }));
  };

  // TODO: Dislike not working due to function checkLikedByUser() is not working as expected, see line 66 for more.

  const checkLikedByUser = () => {
    const { likes, _id, username } = data;
    if (likes.likedBy.length > 0) {
      const likedByUser = likes.likedBy.some(
        (user) => user.username === username
      );
      return likedByUser;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, data.username, authToken]);

  return (
    postsLoading &&
    userLoading && (
      <div className="flex w-full  mx-auto py-2 bg-primaryDark shadow shadow-indigo-500/40 rounded px-2 my-2">
        <div className="w-10 flex-none  mx-2">
          <img
            className="w-20 rounded-full"
            src={user.avatar}
            alt="profile photo"
          />
        </div>
        <div className="flex flex-col grow">
          <div className="flex justify-between items-center w-full">
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            {data.username === authUser.username ? (
              <div className="flex items-center">
                <p>
                  <MdOutlineEdit
                    onClick={() => {
                      setModalClass(modalClass === "hidden" ? "" : "hidden");
                      setUpdatePostData(data.content);
                    }}
                  />
                </p>
                <p>
                  <MdOutlineDelete onClick={() => handleDeletePost(data._id)} />
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <p className="text-xs">{user.bio}</p>
          <p className="text-lg">{data.content}</p>
          {data.likes ? (
            <div className="text-xl flex">
              <div className="flex">
                {checkLikedByUser ? (
                  <button
                    className="hover:text-white"
                    onClick={() => handleLike(data._id)}
                  >
                    <MdFavorite />
                  </button>
                ) : (
                  <button
                    className="hover:text-white"
                    onClick={() => handleDislike(data._id)}
                  >
                    <MdFavoriteBorder />
                  </button>
                )}
                <p>{data.likes.likeCount}</p>
              </div>

              {/* MdFavoriteBorder when liked */}
              <div className="flex">
                <button className="hover:text-white">
                  <MdOutlineInsertComment />
                </button>
                <p>{data.comments.length}</p>
              </div>
              <button
                className="hover:text-white"
                onClick={() => handleBookmarkAdd(data._id)}
              >
                <MdBookmarkAdd />
              </button>
              {/* if bookmarked use `MdBookmarkAdded` */}
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          className={`${modalClass} absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center h-full w-full bg-gray-700/40 `}
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
              <label htmlFor="first name">Update Post</label>
              <textarea
                className="py-2 px-1 my-2 text-black w-full rounded"
                type="text"
                value={updatePostData}
                onChange={(e) => setUpdatePostData(e.target.value)}
              />
              <button
                className="w-full border bg-primaryDark text-paragraphLight hover:opacity-80 my-2 px-3 py-2 rounded"
                type="submit"
                onClick={handleEditPost}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export { PostCard };
