import useAvatar from "../../hooks/useAvatar";
export default function Comment({comment}){
    // post has author. Similarly comment has author that's why we are calling useAvatar with comment 
    const avatarURL = useAvatar(comment);
   
    return (
        <div className="flex items-center gap-3 pt-4">
            <img
              className="w-6 h-6 rounded-full"
              src={avatarURL}
              alt="avatar"
            />
            <div>
              <div className="flex gap-1 text-xs lg:text-sm">
                <span>{comment?.author?.name}: </span>
                <span>{comment?.comment}</span>
              </div>
            </div>
          </div>
    );
}