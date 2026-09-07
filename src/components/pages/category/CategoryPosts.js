import { Link, useParams } from 'react-router-dom';
import Post from '../post/post';
// import '../postlist/PostList.css';
import './CategoryPosts.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useGetPostsByCategoryQuery } from '../../../redux/api/postapi';


export default function CategoryPosts() {
    // const [posts, setPosts] = useState([]);
    // const [category, setCategory] = useState(null);
    const { id } = useParams()
    const { data: posts = [] } = useGetPostsByCategoryQuery(id);

    
	// const fetchCategory = async () => {
        //     const response = await axios.get(`http://localhost:5000/api/categories/${id}`)
        //     setCategory(response.data);
        // }
        
        
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const response = await axios.get(`http://localhost:5000/api/posts/category/${id}`)
    //         setPosts(response.data);
    //     }
    //     fetchPosts();
	// 	// fetchCategory();
    // }, [id]);

    // if (!category) {
    //     return <p>Loading...</p>
    // }

    return (
        <div className="page">
            <main className="main-content category-page-content">
                <section className="posts-column category-posts-column">
                    <Link to="/" className="back-link">&larr; Back to all posts</Link>
                    <h1 className="category-heading">{posts[0]?.category?.name || 'Unknown Category'}</h1>

                    <div className="post-list">
                        {posts.length !== 0 ? (
                            posts.map((post) => (
                                <Post key={post._id} post={post} />
                            ))
                        ) : (
                            <p>No posts available in this category.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
