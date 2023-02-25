const { User } = require("../models");

module.exports = {
    //Get All users
    getUsers(req, res) {
        User.find({})
            .populate('friends')
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
            .populate('friends')
            .then((doc) => {
                !doc
                    ? res.status(500).json({ message: "No user found" })
                    : res.json(doc);
            })
            .catch((err) => res.status(500).json(err));
    },
};
