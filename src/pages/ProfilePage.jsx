import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { auth } = useAuth();
  const { api } = useAxios();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);


  if(loading){
    return <div>Profile data is fetching ......</div>
  }

  return (
    <div>
      <h1>
        Name: {user?.firstName} {user?.lastName}
      </h1>
      <h2>posts: {posts?.length}</h2>
    </div>
  );
}
