const router = require("express").Router();
const {
  getThoughts,
  createThoughts,
  getSingleThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

// all the api routes for CRUD functionality and their given request parameters
router.route("/").get(getThoughts).post(createThoughts);
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = router;
