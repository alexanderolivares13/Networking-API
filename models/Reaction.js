const { Schema, Types } = require("mongoose");
const { DateTime } = require("luxon");

// definind only a schema that is going to be used as a subdocument by the Thoughts.js file and model.
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: DateTime.local(),
      get: (time) => time.toString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
