import { configureStore } from "@redux/toolkit";
import postsReducer  from '../features/posts/postSlice';
import usersReducer from '../features/users/usersSlice.js';

export const store = configureStore({
   reducer: {
     posts: postsReducer, 
     users: usersReducer
   }    
})


















