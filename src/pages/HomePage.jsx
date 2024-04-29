import useAxios from "../hooks/useAxios";
import NewPost from "../components/home/NewPost";
import { useEffect, useReducer, useState } from "react";
import PostList from "../components/posts/PostList";
import { actions } from "../actions";
import { initialState, postReducer } from "../reducers/postReducer";
import PostEntry from "../components/home/PostEntry";
import usePosts from "../hooks/usePosts";

export default function HomePage() {
  const { api } = useAxios();
  const {state, dispatch} = usePosts();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch({
          type: actions.post.DATA_FETCHING,
        });
        const response = await api.get("/posts");
        if (response?.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            payload: response.data,
          });
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          payload: err.message,
        });
      }
    };
    fetchPosts();
  }, []);

  const handleTogglePostEntryUI = () => {
    setIsShow(!isShow);
  };

  if (state?.loading) return <div>Loading.....</div>;
  if (state?.error) return <div>{state?.error}</div>;

  return (
    <div>
      {isShow ? (
        <PostEntry onTogglePostEntryUI={handleTogglePostEntryUI} />
      ) : (
        <NewPost onTogglePostEntryUI={handleTogglePostEntryUI} />
      )}
      <PostList posts={state?.posts} />
    </div>
  );
}
