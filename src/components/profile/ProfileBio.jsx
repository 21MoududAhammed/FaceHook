import { useState } from "react";
import useProfile from "../../hooks/useProfile";
import editIcon from "../../assets/icons/edit.svg";
import checkIcon from "../../assets/icons/check.svg";

export default function ProfileBio() {
  const { state } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
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
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={handleEdit}
        >
          {editMode ? (
            <img src={checkIcon} alt="Edit" />
          ) : (
            <img src={editIcon} alt="Edit" />
          )}
        </button>
      </div>
    </>
  );
}
