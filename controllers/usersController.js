const { User, Thoughts } = require("../models");

module.exports = {
  async getUsers(req, res) {
    //returns all users in the database
    try {
      const users = await User.find().select("-__v");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      // finds a single user using the object ID and also populates the information from the thoughts array.
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts");
      if (!user) {
        res.status(404).json({ message: "No user found with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      if (!req.body || !req.body.username || !req.body.email) {
        res.status(400).json({ message: "Username and email are required." });
      }
      const user = await User.create(req.body);
      res.json({ message: "User created successfully! 🎉", data: user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      //find and update the user based on the _id property
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        //allows a user to update both the username and email
        {
          username: req.body.username,
          email: req.body.email,
        },
        //re-run validation to check that the email is valid.
        { new: true, runValidators: true }
      );
      res.json({
        message: "Username and email updated successfully!",
        data: updatedUser,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // deletes a user and all thoughts posted to the database as well.
  async deleteUser(req, res) {
    try {
      //first find the user to reference the thoughts array
      const findUser = await User.findOne({ _id: req.params.userId });
      if (findUser) {
        //map the user thoughts array and return the _id property.
        const thoughtsArray = await findUser.thoughts.map((e) => e._id);
        // use the delete many model method to delete the thoughts with the respective array of objectIds
        const deletedThoughts = await Thoughts.deleteMany({
          _id: { $in: thoughtsArray },
        });
        // lastly delete the user based on the requested _id
        const deletedUser = await User.deleteOne({ _id: req.params.userId });
        res.json({
          message: "Thoughts and User deleted successfully ",
          data: { thoughts: deletedThoughts, user: deletedUser },
        });
      } else {
        res.status(404).json({ message: "No user found with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      //adds a friend using the _id property
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        //adds to the array of friends using the second object Id
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      res.json({ message: "Friend Added 🤝", data: user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      //remove friend from the friends array using the _id property
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: { friends: req.params.friendId },
        },
        { new: true }
      );
      res.json({ message: "Friend removed 😞", data: user });
    } catch (err) {
      req.status(500).json(err);
    }
  },
};
