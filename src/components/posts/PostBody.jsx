export default function PostBody({ post }) {

  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      {/* If Post has Image, Render this block */}
      {post?.image && (
        <div className="flex items-center justify-center overflow-hidden">
          <img
            className="max-w-full"
            src={`${import.meta.env.VITE_BASE_SERVER_URL}/${post?.image}`}
            alt="poster"
          />
        </div>
      )}
      {post?.content && <p>{post?.content}</p>}
    </div>
  );
}
