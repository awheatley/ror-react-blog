import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../../constants';

function PostEditForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (response.ok) {
          const json = await response.json();
          setPost(json);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentPost();
  }, [id]);

  const handleSubmit = async (e)  => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: post.title,
        body: post.body
      }),
    });

    if (response.ok) {
      const { id } = await response.json();

      navigate(`/posts/${id}`);
    } else {
      console.log('An error occurred');
    }
  };

  return (
    post && <div>
      <h2>Edit post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='post-title'>Title:</label>
          <br />
          <input id='post-title' type='text' value={post.title} onChange={(e) => setPost({...post, title: e.target.value})} />
        </div>
        <div>
          <label htmlFor='post-body'>Body:</label>    
          <br />
          <textarea id='post-body' value={post.body} onChange={(e) => setPost({...post, body: e.target.value})}></textarea>
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm;