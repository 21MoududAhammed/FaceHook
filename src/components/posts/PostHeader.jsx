import threeDots from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import timeIcon from "../../assets/icons/time.svg";
import { useState } from "react";
import useAvatar from "../../hooks/useAvatar";
import { getTimeBasedOnCreationTime } from "../../utils/index";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from 'react-router-dom';
import useEditPost from "../../hooks/useEditPost";

export default function PostHeader({ post, onDeletePost }) {
  const [isShow, setIsShow] = useState(false);
  const avatarURL = useAvatar(post);
  const { auth } = useAuth();
  const { setEditablePost} = useEditPost();
  
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between gap-4">
      {/* author info */}
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={timeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {getTimeBasedOnCreationTime(post?.createAt)}
            </span>
          </div>
        </div>
      </div>
      {/* author info ends */}
      {/* action dot */}

      {auth?.user?.id === post?.author?.id && (
        <div className="relative">
          <button onClick={() => setIsShow(!isShow)}>
            <img src={threeDots} alt="3dots of Action" />
          </button>
          {/* Action Menus Popup */}
          {isShow && (
            <div className="action-modal-container ">
              <button className="action-menu-item hover:text-lwsGreen"
              onClick={()=> {
                setEditablePost(post)
                navigate('/edit')
              }}
              >
                <img src={editIcon} alt="Edit" />
                Edit
              </button>
              <button
                className="action-menu-item hover:text-red-500"
                onClick={() => onDeletePost(post.id)}
              >
                <img src={deleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {/* action dot ends */}
    </header>
  );
}
