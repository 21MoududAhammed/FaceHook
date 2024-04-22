import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";


export default function ProfilePage() {
    const [user, setUser] = useState(null);
  const { auth } = useAuth();
  const { api } = useAxios();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);
  return <h1>Name: {user?.firstName} {user?.lastName}</h1>;
}
