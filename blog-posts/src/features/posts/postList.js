import { useSelector } from "react-redux";
import { getPostStatus, getPostsError, selectAllPosts, } from "./postSlice";
import PostAuthor from "./PostAuthor";

import TimeAgo from "./TimeAgo";
import ReactionButttons from "./ReactionButttons";
import PostsExcerpt from "./PostsExcerpt";


const PostList = () => {
  const posts = useSelector(selectAllPosts);
  //const dispatch = useDispatch();
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostsError)
  //const orderedPosts = posts.slice().sort((a, b) => b.date.localecompare(a.date))

    useEffect(() => {
      if(postStatus === 'idle'){
        dispatch(fetchPosts());
      }
    }, [postStatus, dispatch])     

    let content;
    if(postStatus === "loading"){
       content = <p>"Loading..."</p>; 
    } else if (postStatus === "succeeded"){
      const orderedPosts = posts.slice().sort((a, b) => b.date.localecompare(a.date))      
      content = orderedPosts.map(post => <PostsExcerpt />)  
    } else if( postStatus === 'failed'){
        content = <p>{error}</p>; 
    }

  // const renderedPosts = posts.map(post => (
  //    <article key={post.id}>
  //      <h2>{post.title}</h2>
  //      <p>{post.content.substring(0, 100)}</p>
  //      <p className="postCredit">
  //       <PostAuthor userId={post.userId} />
  //       <TimeAgo timestamp={post.date} />
  //      </p>
  //    </article>
  // ))

   return (
     <div>
        <h2>PostsList</h2>
        {content}
     </div>
   ) 
}

export default PostList;