import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../features/userSlice";
import { dislikePost, likePost, bookmarkPost } from "../features/postSlice";

import {
  MdBookmarkAdd,
  MdBookmarkAdded,
  MdOutlineInsertComment,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";

function PostCard({ data }) {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { postsLoading } = useSelector((state) => state.posts);
  const { users, userLoading } = useSelector((state) => state.users);

  const user = users.filter((user) => user.username === data.username)[0];

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
        <div className="w-1/8  mx-2">
          <img
            className="w-40 rounded-full"
            src={user.avatar}
            alt="profile photo"
          />
        </div>
        <div className="flex flex-col w-7/8">
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
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
                    <MdFavoriteBorder />
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
      </div>
    )
  );
}

export { PostCard };
