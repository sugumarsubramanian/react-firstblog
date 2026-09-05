import Footer from './components/organisms/footer';
import Header from './components/organisms/header';
import PostDetails from './components/pages/postdetails/PostDetails';
import PostList from './components/pages/postlist/PostList';
import CategoryPosts from './components/pages/category/CategoryPosts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/home';

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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
