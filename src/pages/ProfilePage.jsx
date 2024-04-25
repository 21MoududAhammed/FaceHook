import { useEffect } from "react";
import { actions } from "../actions/index.jsx";
import ProfileDetails from "../components/profile/ProfileDetails.jsx";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile.js";
import PostList from "../components/posts/PostList.jsx";

export default function ProfilePage() {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({
        type: actions.profile.DATA_FETCHING,
      });
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            payload: {
              posts: response?.data?.posts,
              user: response?.data?.user,
            },
          });
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          payload: err.message,
        });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>Profile data is fetching ......</div>;
  }

  return (
    <div>
      <ProfileDetails />
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostList posts={state?.posts}/>
    </div>
  );
}
