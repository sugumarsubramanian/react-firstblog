import { useEffect, useState } from 'react';
// import './PostList.css';
import Post from '../post/post';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllPostsQuery } from '../../../redux/api/postapi';
import { useGetAllCategoriesQuery } from '../../../redux/api/categoryapi';


export default function HomePage() {
    const user = useSelector((state) => state.auth.user);
    // const [posts, setPosts] = useState([]);
    const { data: posts = [], isLoading, isError } = useGetAllPostsQuery();
    const { data: categories = [], isLoading: categoriesLoading, isError: categoriesError } = useGetAllCategoriesQuery();
    // const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // const fetchPosts = async () => {
    //     const response = await axios.get('http://localhost:5000/api/posts');
    //     setPosts(response.data);
    // };
    // const fetchPostsByCategory = async () => {
    //     const response = await axios.get(`http://localhost:5000/api/categories`);
    //     setCategories(response.data);
    // };
    // useEffect(() => {
    //     fetchPosts();
    //     fetchPostsByCategory();
    // },[]);

    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category.name);
        navigate(`/posts/category/${category._id}`);
    }
    return (
        <div className="page">
            {user && <p className="welcome-banner">Hi, {user.username}</p>}

            <main className="main-content">
                <section className="posts-column">
                    <h2 className="section-title">Latest Posts</h2>
                    <div className="post-list">
                        {/* {posts.length !== 0 ? 
                        posts.map((post) => (
                            <Post key={post._id} post={post} />
                        )) : <p> No post available</p>} */}
                        {isLoading ? (
                                <p>Loading posts...</p>
                            ) : isError ? (
                                <p>Failed to load posts.</p>
                            ) : posts.length !== 0 ? (
                                posts.slice(0, 5).map((post) => <Post key={post._id} post={post} />)
                            ) : (
                                <p>No posts available.</p>
                            )
                        }
                    </div>
                </section>

                <aside className="sidebar-column">
                    <div className="sidebar-box">
                        <h2 className="section-title">About Me</h2>
                        <p className="about-text">
                            Hi, I'm the author of MyBlog. I write about web development,
                            technology and everyday life. Thanks for stopping by and
                            enjoy your read!
                        </p>
                    </div>

                    <div className="sidebar-box">
                        <h2 className="section-title">Categories</h2>
                        <ul className="category-list">
                            {categoriesLoading ? (
                                <li>Loading categories...</li>
                            ) : categoriesError ? (
                                <li>Failed to load categories</li>
                            ) : categories.map((category) => (
                                <li key={category._id}>
                                    <button
                                        type="button"
                                        className={
                                            'category-btn' +
                                            (activeCategory === category.name ? ' active' : '')
                                        }
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <span>{category.name}</span>
                                        <span className="category-count">{category.count}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </main>

           
        </div>
    );
}
