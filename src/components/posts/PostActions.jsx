import likeIcon from "../../assets/icons/like.svg";
import commentIcon from "../../assets/icons/comment.svg";
import shareIcon from "../../assets/icons/share.svg";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { BiSolidLike } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";

export default function PostActions({ post, commentQuantity }) {
  const { auth } = useAuth();
  const { api } = useAxios();

  const [liked, setLiked] = useState(post?.likes.includes(auth?.user?.id));

  const handleLike = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/posts/${post?.id}/like`
      );
      if (response.status === 200) {
        setLiked(!liked);
      }
    } catch (err) {
      console.log(err);
      setLiked(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      {/* Like Button */}
      <button
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
        onClick={handleLike}
      >
        <p className="text-xl">
          {liked ? <BiSolidLike /> : <AiOutlineLike />}{" "}
        </p>
        {!liked && <span>Like</span>}
      </button>
      {/* Comment Button */}
      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={commentIcon} alt="Comment" />
        <p>
          Comment
          {commentQuantity > 0 && <span>({commentQuantity})</span>}
        </p>
      </button>
      {/* Share Button */}
      {/* Like Button */}
      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={shareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
}
