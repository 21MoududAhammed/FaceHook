import useAvatar from "../../hooks/useAvatar";
import { useState } from "react";
import Comment from "./Comment";
import useAxios from "../../hooks/useAxios";
import useAuth from '../../hooks/useAuth';
import useProfile from '../../hooks/useProfile';

export default function PostComments({ post, onCommentsQuantity, commentQuantity }) {
  const {auth} = useAuth();
  const {state} = useProfile();
  const avatarUrl = state?.user?.avatar ?? auth?.user?.avatar ;
  const { api } = useAxios();
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);

  const addComment = async (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_BASE_SERVER_URL}/posts/${post.id}/comment`,
          { comment }
        );
        if (response.status === 200) {
          setComments([...response.data.comments]);
          onCommentsQuantity(response.data.comments.length);
          setComment("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      {/* comment input box */}
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="w-7 h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_BASE_SERVER_URL}/${avatarUrl}`}
          alt="avatar"
        />
        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={addComment}
          />
        </div>
      </div>
      {/* comment filter button */}
      {commentQuantity > 0 && (
        <div className="mt-4">
          <button
            className="text-gray-300 max-md:text-sm"
            onClick={() => setIsShow(!isShow)}
          >
            All Comment ▾
          </button>
        </div>
      )}
      {/* comments */}
      {isShow && (
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
          {comments?.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      )}
      {/* comments ends */}
    </div>
  );
}
