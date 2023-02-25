const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    postThought,

} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(postThought);

router.route('/:thoughtId').get(getSingleThought);

// router.route("/:thoughtId/reactions");

module.exports = router;
