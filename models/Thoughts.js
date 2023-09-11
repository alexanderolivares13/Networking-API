const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");
const reactionSchema = require("./Reaction");

//the thoughtsSchema uses the reaction schema only to fill the array with responses/reactions
//sending a get request will give you the date in local time, as well as the count of reactions as a virtual
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
      type: String,
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
