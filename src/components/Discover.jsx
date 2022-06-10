import { useEffect } from "react";
import { getAllUsers } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postFollowUser } from "../features/userSlice";

function Discover() {
  const { users } = useSelector((state) => state.users);
  const {
    user: authUser,
    authToken,
    isAuth: authUserLoading,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const checkIfAlreadyFollowing = (user) => {
    if (authUser.following.length > 0) {
      return authUser.following.some(
        (following) => following.username === user.username
      );
    }
    return false;
  };

  const people =
    authUserLoading &&
    users
      .filter((user) => user.username !== authUser.username)
      .filter((user) => checkIfAlreadyFollowing(user) === false)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

  const handleFollow = (username) => {
    dispatch(postFollowUser({ authToken, username }));
  };

  const handleUnfllow = (username) => {
    dispatch(postFollowUser({ authToken, username }));
  };

  useEffect(() => {
    authToken && dispatch(getAllUsers());
  }, [authUserLoading]);

  return (
    <div className="flex-none px-2 py-4 my-2 bg-primaryDark shadow shadow-indigo-500/40 rounded">
      <p className="text-center pb-2">Discover</p>
      <div className="flex justify-around">
        {people.map((person) => (
          <div
            className="flex flex-col justify-between items-center mx-auto px-1 py-2 border-2 border-primary min-w-20 w-40 overflow-hidden max-w-24 rounded hover:shadow hover:shadow-indigo-500/60"
            key={person._id}
          >
            <div className="w-1/8 mx-2">
              <img
                className="w-20 object-cover rounded-full"
                src={person.avatar}
                alt="profile picture of user"
              />
            </div>
            <div className="flex flex-col w-7/8 py-2">
              <Link to={`/profile/${person.username}`}>
                <h1>{`${person.firstName} ${person.lastName}`}</h1>
              </Link>
              <p className="text-xs">{person.bio}</p>
            </div>
            <div>
              <button
                className="bg-red-500 px-3 py-2 rounded w-full text-lg"
                onClick={() => handleFollow(person.username)}
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Discover };
