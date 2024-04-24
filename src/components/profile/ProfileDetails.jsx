import ProfileBio from "./ProfileBio";
import ProfileImage from "./ProfileImage";

export default function ProfileDetails() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage />
      <ProfileBio />
      {/* it's a horizontal line  */}
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
    </div>
  );
}
