const { Schema, model } = require("mongoose");
// create a user model that self-references(friends) and references the thoughts model.
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (username) => username.toLowerCase(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        //validates the user email using some regex
        validator: function (email) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
        },
        message: (input) => `${input.value} is not a valid email`,
      },
      set: (email) => email.toLowerCase(),
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// the virtual counts the number of friends a user has by utilizing the self reference and returning the length of the array.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
