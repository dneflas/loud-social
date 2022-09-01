const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: "You need a title for your post",
      minLength: 1,
      maxLength: 120,
    },
    postBody: {
      type: String,
      required: "Your post is missing some text.",
    },
    author: {
      type: String,
      required: true,
    },
    adminPost: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    reactions: [reactionSchema],
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

postSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Post = model("Post", postSchema);

module.exports = Post;
