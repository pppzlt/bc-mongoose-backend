const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    postThought,
    updateThought
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(postThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought);

// router.route("/:thoughtId/reactions");

module.exports = router;
