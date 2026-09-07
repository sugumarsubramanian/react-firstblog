import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIdQuery, useUpdatePostMutation } from '../../../redux/api/postapi';
import { useGetAllCategoriesQuery } from '../../../redux/api/categoryapi';

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: post, isLoading: postLoading } = useGetPostByIdQuery(id);
    const { data: categories = [] } = useGetAllCategoriesQuery();
    const [updatePost, { isLoading, error }] = useUpdatePostMutation();

    const [formData, setFormData] = useState({ title: '', content: '', category: '', image: '' });

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                content: post.content || '',
                category: post.category?._id || '',
                image: post.image || '',
            });
        }
    }, [post]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost({ id, ...formData }).unwrap();
            navigate('/account/posts');
        } catch (err) {
            // error is already surfaced below via the `error` object from the hook
        }
    };

    if (postLoading) {
        return <p>Loading post...</p>;
    }

    return (
        <div>
            <Link to="/account/posts" className="back-link">&larr; Back to My Posts</Link>
            <h2>Edit Post</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                {error && <p className="auth-error">{error.data?.message || 'Failed to update post.'}</p>}
                <label>
                    Title
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </label>
                <label>
                    Content
                    <textarea name="content" value={formData.content} onChange={handleChange} rows={6} required />
                </label>
                <label>
                    Category
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="" disabled>Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Image URL
                    <input type="text" name="image" value={formData.image} onChange={handleChange} />
                </label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
