import Header from "../components/common/Header";
import NewPost from "../components/home/NewPost";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { auth } = useAuth();
  return (
    <div>
      <NewPost/>
    </div>
  );
}
