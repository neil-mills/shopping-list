const Post = require('../models/Post');

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    addPost: async (parent, { post }, context) => {
      try {
        const newPost = await Post.create({ ...post });
        return newPost;
      } catch (e) {
        console.log(e);
      }
    },
  }
};

module.exports = resolvers;
