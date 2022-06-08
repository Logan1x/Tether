import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../features/userSlice";

function PostCard({ data }) {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { postsLoading } = useSelector((state) => state.posts);
  const { users, userLoading } = useSelector((state) => state.users);

  const user = users.filter((user) => user.username === data.username)[0];

  //   console.log(data);

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
        </div>
      </div>
    )
  );
}

export { PostCard };
