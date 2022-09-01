const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    admin: Boolean
    posts: [Post]
    favorites: [Post]
    postCount: Int
  }
  type Post {
    _id: ID
    postTitle: String!
    postBody: String!
    author: String
    createdAt: String
    comments: [Comment]
    reactions: [Reaction]
    reactionCount: Int
    commentCount: Int
  }
  type Comment {
    _id: ID
    commentBody: String!
    author: String
    createdAt: String
  }
  type Reaction {
    _id: ID
    reaction: Boolean
    username: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    admin(admin: Boolean): [User]
    users: [User]
    user(username: String!): User
    adminPosts(adminPost: Boolean): [Post]
    posts(username: String): [Post]
    post(_id: ID!): Post
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, username: String!, password: String!): Auth
    addPost(postTitle: String!, postBody: String!): Post
    addComment(postId: ID!, commentBody: String!): Post
    addReaction(postId: ID!, reaction: Boolean): Post
    addFavorite(postId: ID!): User
  }
`;

module.exports = typeDefs;
