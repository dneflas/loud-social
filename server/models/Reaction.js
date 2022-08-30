const { Schema } = require("mongoose");

const reactionSchema = new Schema({
  reaction: {
    type: Boolean,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = reactionSchema;
