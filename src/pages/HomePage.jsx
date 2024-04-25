import useAxios from "../hooks/useAxios";
import NewPost from "../components/home/NewPost";
import { useEffect, useReducer } from "react";
import PostList from "../components/posts/PostList";
import { actions } from "../actions";
import { initialState, postReducer } from "../reducers/postReducer";

export default function HomePage() {
  const { api } = useAxios();
  const [state, dispatch] = useReducer(postReducer, initialState);

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

  if (state?.loading) return <div>Loading.....</div>;
  if (state?.error) return <div>{state?.error}</div>;

  return (
    <div>
      <NewPost />
      <PostList posts={state?.posts} />
    </div>
  );
}
