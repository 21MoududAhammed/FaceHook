import PostCard from "./PostCard";

export default function PostList({posts}){
    return (
        <>
        {
            posts?.length && posts.map(post => <PostCard key={post.id} post={post}/>)
        }
        </>
    );
}