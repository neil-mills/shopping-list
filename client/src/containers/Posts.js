import React from 'react'
import { PostList, PostForm } from '../components';
import { withPosts } from '../providers/withPosts';

const Posts = ({ data = [], loading, error }) => {
  return (
    <div>
      <h1>Posts</h1>
      {loading ? ( <p>Loading</p>) : (<p>Posts loaded</p>)}
    </div>
  )
}

export default withPosts(Posts);