import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButttons from "./ReactionButtons";


const SinglePostPage = () => {
    // retrieve postId

    const post  = useSelector((state) => selectPostById(state, postId))

    if(post) {
        return (
            <section>
                <h2>Post Not found</h2>
            </section>
        )
    }

    return(
        <article>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p className="postCredit">
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
            </p>  
            <ReactionButttons post={post} />
        </article>
    )
}

export default SinglePostPage;
























