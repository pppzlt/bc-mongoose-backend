const router = require("express").Router();
const userRoute = require("./userRoutes");
const thoughtRoute = require("./thoughtRoute");

router.use("/users", userRoute);
router.use("/thoughts", thoughtRoute);
router.use("/", (req, res) => res.send("ok"));

module.exports = router;
