import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";
import { useState } from "react";

export default function PostCard({ post }) {
  const [commentQuantity, setCommentQuantity] = useState(post?.comments.length);
  const handleCommentsQuantity = (quantity) => {
    setCommentQuantity(quantity);
  };
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostActions post={post} commentQuantity={commentQuantity} />
      <PostComments post={post} onCommentsQuantity={handleCommentsQuantity} />
    </article>
  );
}
