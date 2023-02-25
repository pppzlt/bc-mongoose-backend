const {User ,Thought, Reaction} = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((doc) => {
                res.status(200).json(doc)   
            })
            .catch((err)=>{res.status(500).json(err)})
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((doc) =>
                !doc
                    ? res.status(400).json({ msg: 'No thought found' })
                    : res.status(200).json(doc)
                )
            .catch((err)=>res.status(500).json(err))
    },
    
}