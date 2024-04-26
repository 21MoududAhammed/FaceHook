import logo from "../../assets/images/logo.svg";
import homeIcon from "../../assets/icons/home.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import defaultAvatar from "../../assets/icons/profile_avatar.png";

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;

  const avatar = user?.avatar
    ? `${import.meta.env.VITE_BASE_SERVER_URL}/${user?.avatar}`
    : defaultAvatar;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Logo */}
        <a href="./index.html">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={logo}
          />
        </a>
        {/* nav links  */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={homeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={notificationIcon} alt="Notification" />
          </button>
          <Logout />
          <button className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {user?.firstName}
            </span>
            <Link to="/me">
              <img
                className="h-8 w-8 rounded-full lg:max-h-[44px] lg:max-w-[44px]"
                src={avatar}
                alt="avatar"
              />
            </Link>
          </button>
        </div>
        {/* nav links ends */}
      </div>
    </nav>
  );
}
