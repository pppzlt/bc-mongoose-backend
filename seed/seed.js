const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => {
    logError(err);
});

connection.once("open", async () => {
    console.log("connected");

    // Drop existing data
    await Thought.deleteMany();
    await User.deleteMany();

    const users = [
        {
            username: "John",
            email: "a@a.com",
        },
        {
            username: "Peter",
            email: "b@a.com",
        },
        {
            username: "Lily",
            email: "c@a.com",
        },
        {
            username: "David",
            email: "d@a.com",
        },
        {
            username: "Bob",
            email: "e@a.com",
            friends: [{ _id: "63f939824268a185ff4ac126" }],
        },
    ];

    const thoughts = [
        {
            thoughtText: "123",
            username: "Peter",
            reactions: [
                {
                    reactionBody: "this is cool!",
                    username: "Bob",
                },
                {
                    reactionBody: "this is bad!",
                    username: "John",
                },
            ],
        },
        {
            thoughtText: "456",
            username: "Bob",
        },
    ];

    // Add users
    await User.collection.insertMany(users);

    // Add thoughts
    await Thought.collection.insertMany(thoughts);
    console.info("seeding complete!");
    process.exit(0);
});
