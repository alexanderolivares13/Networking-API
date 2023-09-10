const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");
const reactionSchema = require("./Reaction");

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: DateTime.local(),
      get: (time) => time.toString(),
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
