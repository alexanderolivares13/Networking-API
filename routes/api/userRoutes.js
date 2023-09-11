const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  addFriend,
  deleteFriend,
  deleteUser,
  updateUser,
} = require("../../controllers/usersController");

// all the api routes for CRUD functionality and their given request parameters
router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;
