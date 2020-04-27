import React from 'react'

export const PostList = ({ posts, loading }) => {
  if (loading) return null;
  return (
    <ul>
      {posts.map(post => (
        <li>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  )
};
