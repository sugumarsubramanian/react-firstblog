import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreatePostMutation } from '../../../redux/api/postapi';
import { useGetAllCategoriesQuery } from '../../../redux/api/categoryapi';

export default function NewPost() {
    const user = useSelector((state) => state.auth.user);
    const { data: categories = [] } = useGetAllCategoriesQuery();
    const [createPost, { isLoading, error }] = useCreatePostMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPost({ ...formData, author: user.username }).unwrap();
            navigate('/account/posts');
        } catch (err) {
            // error is already surfaced below via the `error` object from the hook
        }
    };

    return (
        <div>
            <h2>New Post</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                {error && <p className="auth-error">{error.data?.message || 'Failed to create post.'}</p>}
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
                    {isLoading ? 'Publishing...' : 'Publish Post'}
                </button>
            </form>
        </div>
    );
}
