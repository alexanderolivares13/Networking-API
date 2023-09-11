const router = require("express").Router();
const {
  getThoughts,
  createThoughts,
  getSingleThought,
  deleteThought,
  createReaction,
} = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(createThoughts);
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction);
// .delete(deleteReaction)
module.exports = router;
