import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyPostsQuery, useDeletePostMutation } from '../../../redux/api/postapi';

export default function MyPosts() {
    const { data: posts = [], isLoading, isError } = useGetMyPostsQuery();
    const [deletePost] = useDeletePostMutation();
    const [confirmingId, setConfirmingId] = useState(null);

    const handleConfirmDelete = async () => {
        try {
            await deletePost(confirmingId).unwrap();
        } catch (err) {
            alert('Failed to delete the post.');
        } finally {
            setConfirmingId(null);
        }
    };

    return (
        <div>
            <h2>My Posts</h2>
            <div className="post-list">
                {isLoading ? (
                    <p>Loading your posts...</p>
                ) : isError ? (
                    <p>Failed to load your posts.</p>
                ) : posts.length !== 0 ? (
                    posts.map((post) => (
                        <article className="post-card" key={post._id}>
                            <img src={post.image} alt={post.title} />
                            <div className="post-card-body">
                                <h3>{post.title}</h3>
                                <p className="post-excerpt">{post.content.substring(0, 110)}...</p>
                                <div className="my-post-actions">
                                    <Link to={`/account/edit/${post._id}`} className="edit-btn">Edit</Link>
                                    <button type="button" className="delete-btn" onClick={() => setConfirmingId(post._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p>You haven't created any posts yet.</p>
                )}
            </div>

            {confirmingId && (
                <div className="confirm-toast">
                    <span>Delete this post? This cannot be undone.</span>
                    <div className="confirm-toast-actions">
                        <button type="button" className="confirm-btn" onClick={handleConfirmDelete}>
                            Delete
                        </button>
                        <button type="button" className="cancel-btn" onClick={() => setConfirmingId(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
