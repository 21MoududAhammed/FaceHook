import useProfile from "../../hooks/useProfile";
import editIcon from '../../assets/icons/edit.svg'
export default function ProfileImage() {
  const { state } = useProfile();

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="w-20"
        src={`${import.meta.env.VITE_BASE_SERVER_URL}/${state?.user?.avatar}`}
        alt='avatar'
      />
      <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
        <img src={editIcon} alt="Edit" />
      </button>
    </div>
  );
}
