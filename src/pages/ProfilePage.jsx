import { useEffect, useState, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from '../hooks/useProfile.js'
import { initialState, profileReducer } from "../reducers/profileReducer";
import {actions} from '../actions/index.jsx';

export default function ProfilePage() {

  const { auth } = useAuth();
  const { api } = useAxios();
  const {state,dispatch} = useProfile();


  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({
        type: actions.profile.DATA_FETCHING,
      });
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        dispatch({
          type: actions.profile.DATA_FETCHED,
          payload: {
            posts: response?.data?.posts,
            user: response?.data?.user,
          },
        });
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
      <h1>
        Name: {state?.user?.firstName} {state?.user?.lastName}
      </h1>
      <h2>posts: {state?.posts?.length}</h2>
      {state?.error && <h1>{state?.error}</h1>}
    </div>
  );
}
