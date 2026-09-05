import React from 'react'
import { Link } from 'react-router-dom';

function Post({ post }) {
  // const navigate = useNavigate();
  // const handlereadmore = (postId) => {
  //   navigate(`/posts/${postId}`);
  // }
  return (
    <article className="post-card" key={post._id}>
        <img src={post.image} alt={post.title} />
        <div className="post-card-body">
            <h3>{post.title}</h3>
            <p className="post-excerpt">{post.content.substring(0, 110)} ...</p>
            {/* <button type="button" className="read-more-btn" onClick={handlereadmore(post.id)}>Read More</button> */}
            <Link to={`/posts/${post._id}`}  className="read-more-btn">Read More</Link>
        </div>
    </article>
  )
}

export default Post
