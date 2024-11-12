import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// API_URL comes from .env.development file
import { API_URL } from '../../constants';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setError] = useState(true);
  const [, setLoading] = useState(null);
  
  // Fetch posts from API
  useEffect(() => {
    async function loadPosts() {
      
      try {
        const response = await fetch(`${API_URL}`);

        if (response.ok) {
          const json = await response.json();

          setPosts(json);
        } else {
          throw response;
        }
      } catch (error) {
        setError('An error occurred');
        console.log('An error occurred: ', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className='post-container'>
          <h2><Link to={`/posts/${post.id}`} className='post-title'>{post.title}</Link></h2>
          <p>{post.body}</p>
       </div>
      ))}
    </div>
  )
}

export default PostsList;