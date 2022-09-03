const { User, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // me: User
    me: async (parent, arg, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts")
          .populate("favorites");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    // admin(admin: Boolean): [User]
    admin: async (parent, arg, context) => {
      if (context.user) {
        const adminData = await User.find({ admin: 1 })
          .select("-__v -password")
          .populate("posts")
          .populate("favorites");

        return adminData;
      }
      throw new AuthenticationError("Not logged in");
    },
    // users: [User]
    users: async (parent, arg, context) => {
      if (context.user) {
        return User.find()
          .select("-__v -password")
          .populate("posts")
          .populate("favorites");
      }
      throw new AuthenticationError("Not logged in");
    },
    // user(username: String!): User
    user: async (parent, { username }, context) => {
      if (context.user) {
        return User.findOne({ username })
          .select("-__v -password")
          .populate("posts")
          .populate("favorites");
      }
      throw new AuthenticationError("Not logged in");
    },
    // adminPosts(adminPost: Boolean): [Post]
    adminPosts: async (parent, { adminPost }, context) => {
      if (context.user) {
        return Post.find({ adminPost }).sort({ createdAt: -1 });
      }
      throw new AuthenticationError("Not logged in");
    },
    //    allPosts: [Post]
    allPosts: async (parent, args, context) => {
      if (context.user) {
        return Post.find().sort({ createdAt: -1 });
      }
      throw new AuthenticationError("Not logged in");
    },
    // posts(username: String): [Post]
    userPosts: async (parent, { username }, context) => {
      const params = username ? { username } : {};
      if (context.user) {
        return Post.find(params).sort({ createdAt: -1 });
      }
      throw new AuthenticationError("Not logged in");
    },
    // post(_id: ID!): Post
    post: async (parent, { _id }, context) => {
      if (context.user) {
        return Post.findOne({ _id });
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    // login(email: String!, password: String!): Auth
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = user.isPasswordCorrect(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    // addUser(email: String!, username: String!, password: String!): Auth
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // addAdmin(email: String!, username: String!, password: String!): Auth
    addAdmin: async (parent, args, context) => {
      if (context.user.admin) {
        return await User.create({
          ...args,
          admin: true,
        });
      }
      throw new AuthenticationError("Incorrect credentials");
    },
    // addPost(postTitle: String!, postBody: String!): Post
    addPost: async (parent, { postTitle, postBody }, context) => {
      console.log(context.user.username);
      if (context.user) {
        const post = await Post.create({
          postTitle,
          postBody,
          author: context.user.username,
          adminPost: context.user.admin,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true, runValidators: true }
        );
        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // updatePost(postId: ID! postTitle: String, postBody: String): Post
    updatePost: async (parent, { postId, ...args }, context) => {
      if (context.user) {
        return await Post.findOneAndUpdate(
          { _id: postId },
          { ...args },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // deletePost(postId: ID!): User
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const deletedPost = await Post.findOneAndDelete({ _id: postId });

        return await User.findOneAndUpdate(
          { username: deletedPost.author },
          { $pull: { posts: postId } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // addComment(postId: ID!, commentBody: String!): Post
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: { comments: { commentBody, author: context.user.username } },
          },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // addReaction(postId: ID!, reaction: Boolean): Post
    addReaction: async (parent, { postId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              reactions: { reaction: true, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // addFavorite(postId: ID!): User
    addFavorite: async (parent, { postId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: postId } },
          { new: true, runValidators: true }
        ).populate("favorites");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
