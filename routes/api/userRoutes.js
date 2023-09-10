const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/usersController");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;
