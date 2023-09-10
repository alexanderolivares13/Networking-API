const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
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
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
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
