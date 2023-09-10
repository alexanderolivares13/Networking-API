const router = require("express").Router();
const { getThoughts } = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts);

module.exports = router;
