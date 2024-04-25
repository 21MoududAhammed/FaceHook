import useProfile from "../hooks/useProfile";
import { useState } from "react";

const useAvatar = (post) => {
  const { state } = useProfile();
  let avatar = '';

  if (post?.author?.id === state?.user?.id) {
    avatar = state?.user?.avatar;
  } else {
    avatar = post?.author?.avatar;
  }
  return `${import.meta.env.VITE_BASE_SERVER_URL}/${avatar}`;
};

export default useAvatar;
