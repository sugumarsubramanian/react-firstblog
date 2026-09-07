import Footer from './components/organisms/footer';
import Header from './components/organisms/header';
import PostDetails from './components/pages/postdetails/PostDetails';
import PostList from './components/pages/postlist/PostList';
import CategoryPosts from './components/pages/category/CategoryPosts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/home';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Account from './components/pages/account';
import Profile from './components/pages/account/Profile';
import MyPosts from './components/pages/account/MyPosts';
import NewPost from './components/pages/account/NewPost';
import EditPost from './components/pages/account/EditPost';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/category/:id" element={<CategoryPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<ProtectedRoute />}>
            <Route element={<Account />}>
              <Route path="profile" element={<Profile />} />
              <Route path="posts" element={<MyPosts />} />
              <Route path="new" element={<NewPost />} />
              <Route path="edit/:id" element={<EditPost />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
