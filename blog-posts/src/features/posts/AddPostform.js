import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { nanoid } from "@redux/toolkit";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from '../users/usersSlice'; 


const AddPostForm = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const users = useSelector(selectAllUsers);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

     const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

     const onSavePostClicked = () => {
        if(canSave){
          try{
            setAddRequestStatus('pending')
            dispatch(addNewPost({ title, body: content, userId })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
          } catch (err){
            console.error('Failed to save the post', err)
          } finally{
            setAddRequestStatus('idle')
          }
        }
     }

       const usersOptions = users.map(  => ( 
           <option key={user.id} value={user.id}>
            {user.name}
           </option>
       ))

              

    return (
        <section>
          <h2>Add a new Post</h2>
          <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />  
          
           <label htmlFor="postContent">Content:</label>
           <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
           <button type="button" onClick={onSavePostClicked}>Save Post</button>
          </form>  
        </section>
    )
    



export default AddPostForm;