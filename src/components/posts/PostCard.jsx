import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

export default function PostCard({post}){
    return (
        <article class="card mt-6 lg:mt-8">
            <PostHeader post={post}/>
            <PostBody/>
            <PostActions/>
            <PostComments/>
        </article>
    );
}