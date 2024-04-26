import useProfile from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import editIcon from "../../assets/icons/edit.svg";
import { useRef, useState } from "react";
import { actions } from "../../actions/index";
import defaultAvatar from "../../assets/icons/profile_avatar.png";

export default function ProfileImage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const avatarRef = useRef();

  const handleEditAvatar = () => {
    // after clicking editIcon this function will click the input filed to get file
    avatarRef.current.click();
  };

  const handleFileChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        const response = await api.post(
          `/profile/${state?.user?.id}/avatar`,
          formData
        );
        if (response?.status === 200) {
          dispatch({
            type: actions.profile.IMAGE_UPDATED,
            payload: response.data.avatar,
          });
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          payload: err.message,
        });
      }
    }
  };

  const avatar = state?.user?.avatar
    ? `${import.meta.env.VITE_BASE_SERVER_URL}/${state?.user?.avatar}`
    : defaultAvatar;

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img className="w-24 h-24 rounded-full" src={avatar} alt="avatar" />

      <form className="hidden">
        <input type="file" ref={avatarRef} onChange={handleFileChange} />
      </form>

      <button
        className="flex-center absolute bottom-4 right-1 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        onClick={handleEditAvatar}
      >
        <img src={editIcon} alt="Edit" />
      </button>
    </div>
  );
}
