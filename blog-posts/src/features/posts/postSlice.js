import { createSlice, createSelector, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localCompare(a.date)
}) 

const initialState = { 
         posts: [],
         status: 'idle', 
         error: null,
         error: 0
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
   try{
      const response = await axios.get(POSTS_URL)
      return [...response.data];
   } catch(err){
     return err.message;
   }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
   try{
     const response = await axios.post(POSTS_URL, initialPost)
     return response.data
   } catch(err) {
     return err.message;
   }
})

  export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try{
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
      return response.data
    } catch (err){
      //return err.message;
      return initialPost; // only for testing redux!
    }
  })

  export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try{
      const response = await axios.delete(`${POSTS_URL}/${id}`)
      if(response?.status == 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch(err) {
       return err.message;
    }
  })

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: { 
          reducer(state, action){
          state.push(action.payload)  
        },
        prepare(title, content, userId){
            return {
                payload: {
                  id: nanoid(),
                  title,
                  content,
                  date: new Date.toISOString(),
                  userId,
                  reactions: {
                      thumbsup: 0,
                       wow: 0,
                       heart: 0,
                       rocket: 0,
                       coffee: 0
                  }  
                }
              }
            }
        },
        reactionAdded(state, action){
          const { postId, reaction } = action.payload
          const existingPost = state.find(post => post.id === postId)
          if (existingPost) {
            existingPost.reactions[reaction]++
          }
        },
        increaseCount(state, action){
          state.count = state.count + 1
        }
    },
    extraReducers(builder){
      builder.addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      }).addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions ={
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
          }
            return post;    
        });

        // Add any fecthed posts to the array
        state.posts = state.posts.concat(loadedPosts)

      }).addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          eyes: 0
        }
        console.log(action.payload)
        state.posts.push(action.payload)
      }).addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id){
          console.log('Update could not complete')
          console.log(action.payload)
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter(post => post.id !== id);
        state.posts = [...posts, action.payload];
      }).addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id){
          console.log('Delete could not complete')
          console.log(action.payload)
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter(post => post.id !== id);
        state.posts = posts;
      })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;


export const selectPostById = (state, postId) => 
      state.posts.posts.find(post => post.id === postId);

export const selectPostsByUSer =  createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)

export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;



























