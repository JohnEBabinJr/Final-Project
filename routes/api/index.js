const router = require("express").Router();
const songRoutes = require("./tracks");

// Book routes
router.use("/tracks", songRoutes);

module.exports = router;
