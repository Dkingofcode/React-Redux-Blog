import PostList from "./features/posts/postList";
import AddPostForm from "./features/posts/AddPostform";
import EditPostForm from "./features/posts/EditPostForm"; 
import { Routes, Route, Navigate } from 'react-router-dom';
import SinglePostpage from "./features/posts/SinglePostPage";
import Layout from "./component/Layout";
import UserPage from "./features/users/UserPage";
import UsersList from "./features/users/UsersList";



function App() {
   return (
      <Routes>
        <Route path="/" element={<Layout />}>
          
         <Route index element={<PostList />} />
          
         <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostpage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
         </Route>
         
         <Route path="user">
           <Route index element={<UsersList />} />
           <Route path=":userId" element={<UserPage />} />   
         </Route>
 
       <Route path="*" element={<Navigate to="/" replace />} />
             
         </Route>
      </Routes>
   ); 
}

export default App;



































