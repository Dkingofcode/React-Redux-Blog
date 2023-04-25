import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const reactionEmoji = {
    thumbsup: '',
    wow: '',
    heart:  '',
    rocket: '',
    coffee: '',
}

const  ReactionButttons = () => {
   const dispatch = useDispatch();

   const reactionbuttons = Object.entries(reactionEmoji).map(([name, emoji]) => {

       return (
            <button key={name} type="button" className="reactionButton" onClick={() => {
                dispatch(reactionAdded({ postId: post.id, reaction: name }))
            }}>
              {emoji} {post.reactions[name]}
            </button>
       )
   }) 

   return(
      <div>
        {reactionbuttons}
      </div>
   )

}


export default ReactionButttons;

















































