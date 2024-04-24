import { useState } from "react";
import useProfile from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import editIcon from "../../assets/icons/edit.svg";
import checkIcon from "../../assets/icons/check.svg";
import { actions } from "../../actions/index";

export default function ProfileBio() {
  const { api } = useAxios();
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleSave = async () => {
    dispatch({
      type: actions.profile.DATA_FETCHING,
    });
    try {
      const response = await api.patch(`/profile/${state?.user?.id}`, { bio });
      if (response?.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          payload: response.data,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        payload: err?.message,
      });
    }
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };
  return (
    <>
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        {editMode ? (
          <div className="flex-1">
            <textarea
              className="text-black p-2 rounded"
              name=""
              id=""
              cols="40"
              rows="6"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
        ) : (
          <div className="flex-1">
            <p className="leading-[188%] text-gray-400 lg:text-lg"> {bio} </p>
          </div>
        )}

        {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
        <button className="flex-center h-7 w-7 rounded-full">
          {editMode ? (
            <img src={checkIcon} alt="Edit" onClick={handleSave} />
          ) : (
            <img src={editIcon} alt="Edit" onClick={handleEdit} />
          )}
        </button>
      </div>
    </>
  );
}
