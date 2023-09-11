const { Thoughts, User} = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find().select("-__v");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      if (!req.params.thoughtId) {
        res.status(400).json({ message: "No thought found with that ID" });
      }
      const thoughts = await Thoughts.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThoughts(req, res) {
    try {
      if (!req.body.username || !req.body.thoughtText) {
        res.status(400).json({ message: "Username and text are required." });
        return;
      }
      const thoughts = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        {
          username: req.body.username,
        },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true, upsert: false }
      );
      res.json({ data: [thoughts, user] });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const updatedThought = await Thoughts.findOneAndUpdate(
        {
          _id: req.params.thoughtsId,
        },
        {
          username: req.body.username,
          thoughtText: req.body.thoughtText,
        },
        { new: true }
      );
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      if (!req.params.thoughtId) {
        res.status(400).json({ message: "No thought found with that ID" });
      }
      const deletedThought = await Thoughts.deleteOne({
        _id: req.params.thoughtId,
      });
      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      if (!req.body || !req.body.reactionBody || !req.body.username) {
        res
          .status(400)
          .json({ message: "Reactions must have a username and text" });
        return;
      }
      const reaction = await Thoughts.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $addToSet: {
            reactions: {
              reactionBody: req.body.reactionBody,
              username: req.body.username,
            },
          },
        },
        { new: true }
      );
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const deletedReaction = await Thoughts.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      res.json(deletedReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
