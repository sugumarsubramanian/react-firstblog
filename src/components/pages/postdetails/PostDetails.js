import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
// import './PostDetails.css';

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(response.data);
                setError(null);
            } catch (err) {
                setError('Post not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <div className="post-details-page"><p>Loading...</p></div>;
    }

    if (error || !post) {
        return (
            <div className="post-details-page">
                <p>{error || 'Post not found.'}</p>
                <Link to="/" className="back-link">&larr; Back to posts</Link>
            </div>
        );
    }
    const formatedDate = Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(post.createdAt));

    // const formatDate = new Date(post.createdAt).toLocaleDateString();
    return (
        <div className="post-details-page">
            <article className="post-details-card">
                <Link to="/" className="back-link">&larr; Back to posts</Link>

                {post.image && (
                    <img className="post-details-image" src={post.image} alt={post.title} />
                )}

                <span className="post-details-category">{post.category?.name}</span>
                <h1 className="post-details-title">{post.title}</h1>
                <p className="post-details-meta">
                    by {post.author} &middot; {formatedDate}
                </p>

                <div className="post-details-content">
                    {post.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
}

export default PostDetails;
