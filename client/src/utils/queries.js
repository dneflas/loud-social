import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      posts {
        _id
        postTitle
        postBody
        comments {
          author
        }
      }
      favorites {
        _id
        postTitle
        postBody
        author
      }
    }
  }
`;

export const QUERY_ADMIN = gql`
  query admin {
    admin {
      _id
      username
      email
      postCount
      posts {
        _id
        postTitle
        postBody
        createdAt
        comments {
          commentBody
          author
          createdAt
        }
        reactions {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      admin
      postCount
      posts {
        _id
        commentCount
        reactionCount
      }
      favorites {
        _id
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      admin
      postCount
      posts {
        _id
        commentCount
        reactionCount
        createdAt
      }
      favorites {
        _id
      }
    }
  }
`;

export const QUERY_ADMIN_POSTS = gql`
  query adminPosts {
    adminPosts(adminPost: true) {
      _id
      postTitle
      postBody
      author
      createdAt
      commentCount
      reactionCount
      comments {
        _id
        commentBody
        author
      }
      reactions {
        _id
        username
      }
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
  query allPosts {
    allPosts {
      _id
      postTitle
      postBody
      author
      createdAt
      commentCount
      reactionCount
      comments {
        _id
        commentBody
        author
      }
      reactions {
        _id
        username
      }
    }
  }
`;

export const QUERY_USER_POSTS = gql`
  query userPosts($username: String!) {
    userPosts(username: $username) {
      _id
      postTitle
      postBody
      author
      createdAt
      commentCount
      reactionCount
      comments {
        _id
        commentBody
        author
      }
      reactions {
        _id
        username
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postTitle
      postBody
      author
      createdAt
      commentCount
      reactionCount
      comments {
        _id
        commentBody
        author
      }
      reactions {
        _id
        username
      }
    }
  }
`;
