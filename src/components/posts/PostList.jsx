import PostCard from "./PostCard";
import usePosts from "../../hooks/usePosts";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";
import useProfile from "../../hooks/useProfile";

export default function PostList({ posts }) {
  const { dispatch: postsDispatch } = usePosts();
  const {dispatch: profileDispatch} = useProfile();
  const { api } = useAxios();
  const handleDeletePost = async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      if (response.status === 200) {
        postsDispatch({
          type: actions.post.POST_DELETED,
          payload: id,
        });
        profileDispatch({
          type: actions.profile.PROFILE_POST_DELETED,
          payload: id,
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
  return (
    <>
      {posts?.length &&
        posts.map((post) => (
          <PostCard key={post.id} post={post} onDeletePost={handleDeletePost} />
        ))}
    </>
  );
}
