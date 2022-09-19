import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        admin
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        username
        email
        admin
      }
    }
  }
`;

export const ADD_ADMIN = gql`
  mutation addAdmin($email: String!, $username: String!, $password: String!) {
    addAdmin(email: $email, username: $username, password: $password) {
      _id
      username
      email
      admin
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postTitle: String!, $postBody: String!) {
    addPost(postTitle: $postTitle, postBody: $postBody) {
      _id
      postTitle
      postBody
      createdAt
      author
      comments {
        commentBody
        createdAt
        author
      }
      reactions {
        username
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $postTitle: String, $postBody: String) {
    updatePost(postId: $postId, postTitle: $postTitle, postBody: $postBody) {
      _id
      postTitle
      postBody
      createdAt
      author
      comments {
        commentBody
        createdAt
        author
      }
      reactions {
        username
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      username
      postCount
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      postBody
      postBody
      author
      comments {
        _id
        commentBody
        createdAt
        author
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($postId: ID!) {
    addReaction(postId: $postId) {
      _id
      postTitle
      postTitle
      reactionCount
      commentCount
      comments {
        _id
        author
        commentBody
      }
      reactions {
        _id
        username
        reaction
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($postId: ID!) {
    addFavorite(postId: $postId) {
      _id
      username
      favorites {
        _id
        postTitle
        postBody
      }
    }
  }
`;
