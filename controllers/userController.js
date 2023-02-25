const { User, Thought } = require("../models");

module.exports = {
    //Get All users
    getUsers(req, res) {
        User.find({})
            .then((doc) => {
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //Get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate(["friends", "thoughts"])
            .then((doc) => {
                !doc
                    ? res.status(500).json({ message: "No user found" })
                    : res.json(doc);
            })
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                !user
                    ? res.status(400).json({ message: "No user found" })
                    : res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(400).json({ msg: 'No user id' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } }))
            .then(() => res.json({msg: 'user and related thoughts deleted'}))
            .catch((err)=> res.status(500).json(err));
    },
};
