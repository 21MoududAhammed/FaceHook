import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import defaultAvatar from '../../assets/icons/profile_avatar.png'

export default function NewPost({onTogglePostEntryUI}) {
  const { state } = useProfile();
  const { auth } = useAuth();
  const user = state?.user ?? auth?.user;

  const avatar = user?.avatar ? `${import.meta.env.VITE_BASE_SERVER_URL}/${user?.avatar}` : defaultAvatar;



  return (
    <div className="card">
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="w-10 h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatar}
          alt="avatar"
        />
        <div className="flex-1">
          <textarea
            className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            defaultValue={""}
            onClick={onTogglePostEntryUI}
          />
        </div>
      </div>
    </div>
  );
}
