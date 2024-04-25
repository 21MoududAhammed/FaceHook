import useAxios from "../hooks/useAxios";
import NewPost from "../components/home/NewPost";
import { useEffect, useState } from "react";
import PostList from "../components/posts/PostList";

export default function HomePage() {
  const { api } = useAxios();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/posts");
        if (response?.status === 200) {
          setPosts(response.data);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading.....</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <NewPost />
      <PostList posts={posts} />
    </div>
  );
}
