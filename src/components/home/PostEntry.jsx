import addPhotoIcon from "../../assets/icons/addPhoto.svg";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { postReducer } from "../../reducers/postReducer";
import { initialState } from "../../reducers/postReducer";
import { useState, useRef, useReducer } from "react";
import { actions } from "../../actions";
import usePosts from "../../hooks/usePosts";

export default function PostEntry({ onTogglePostEntryUI }) {
  const [postText, setPostText] = useState("");
  const inputRef = useRef();
  const { auth } = useAuth();
  const { state: profile } = useProfile();
  const { api } = useAxios();
  const { state, dispatch } = usePosts();
  const [photo, setPhoto] = useState("");

  const user = profile?.user ?? auth?.user;

  const handleUpdatePhoto = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const getPostPhoto = (e) => {
    const photo = e.target.files[0];
    setPhoto(photo);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", postText);
    formData.append("postType", "both");
    formData.append("image", photo);
    try {
      dispatch({
        type: actions.post.DATA_FETCHING,
      });
      const response = await api.post(`/posts`, formData);
      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_CREATED,
          payload: response.data,
        });
        onTogglePostEntryUI();
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
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_BASE_SERVER_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>
              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>
          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
            onClick={handleUpdatePhoto}
          >
            <img src={addPhotoIcon} alt="Add Photo" />
            Add Photo
          </label>
          <input
            ref={inputRef}
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            onChange={getPostPhoto}
          />
        </div>
        {/* Post Text Input */}
        <textarea
          name="post"
          id="post"
          placeholder="Share your thoughts..."
          className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          defaultValue={""}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
            onClick={handleSubmitPost}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
