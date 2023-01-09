import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_POSTS } from "../utils/queries";

const PostFeed = () => {
  const { data } = useQuery(QUERY_ALL_POSTS);
  const allPosts = data?.allPosts || [];

  return (
    <div>
      <>
        <h3>Say it LOUD</h3>
        {allPosts ? (
          allPosts.map((post) => (
            <div key={post._id}>
              <h4>{post.postTitle}</h4>
              <p>
                created by {post.author} on {post.createdAt}
              </p>
              <p>{post.postBody}</p>
            </div>
          ))
        ) : (
          <p>No posts yet</p>
        )}
      </>
    </div>
  );
};

export default PostFeed;
