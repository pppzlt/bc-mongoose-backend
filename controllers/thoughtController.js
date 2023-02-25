const { User, Thought, Reaction } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((doc) => {
                res.status(200).json(doc);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((doc) =>
                !doc
                    ? res.status(400).json({ msg: "No thought found" })
                    : res.status(200).json(doc)
            )
            .catch((err) => res.status(500).json(err));
    },
    postThought(req, res) {
        Thought.create(req.body)
            .then((thought) =>
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                )
            )
            .then(() => res.json({ msg: "thought created and user updated" }))
            .catch((err) => res.json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((doc) =>
                !doc ? res.json({ msg: "no thought found!" }) : res.json(doc)
            )
            .catch((err) => res.json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.json({ msg: "no thought found!" })
                    : User.findOneAndUpdate(
                          { thoughts: { $in: thought._id } },
                          { $pull: { thoughts: thought._id } },
                          { new: true }
                      )
            )
            .then((user) =>
                !user
                    ? res.json({ msg: "No user has this thought" })
                    : res.json({
                          msg: "Thought deleted and related user updated",
                      })
            )
            .catch((err) => res.json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ msg: "No thought found" })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.json({ msg: "No thought found" })
                    : res.json(thought)
            )
            .catch((err) => res.statsu(500).json(err));
    },
};
