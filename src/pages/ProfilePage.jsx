import { useEffect } from "react";
import { actions } from "../actions/index.jsx";
import ProfileDetails from "../components/profile/ProfileDetails.jsx";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile.js";

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
    <>
      <ProfileDetails />
    </>
  );
}
