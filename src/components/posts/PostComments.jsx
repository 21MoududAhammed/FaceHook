import useAvatar from "../../hooks/useAvatar";
import { useState } from "react";
import Comment from "./Comment";

export default function PostComments({ post }) {
  const avatarUrl = useAvatar(post);
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      {/* comment input box */}
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="w-7 h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={avatarUrl}
          alt="avatar"
        />
        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      {/* comment filter button */}
      {post?.comments.length > 0 && (
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
          {
            post?.comments.map((comment, index) => <Comment key={index} comment={comment}/>)
          }
        </div>
      )}
      {/* comments ends */}
    </div>
  );
}
