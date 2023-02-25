const router = require("express").Router();
const userRoute = require("./userRoutes");

router.use("/users", userRoute);
router.use("/", (req, res) => res.send("ok"));

module.exports = router;
