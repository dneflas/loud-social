const { Schema } = require("mongoose");

const reactionSchema = new Schema({
  reaction: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = reactionSchema;
