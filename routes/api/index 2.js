const router = require("express").Router();
const songRoutes = require("./tracks.js");

// Track routes
router.use("/tracks", songRoutes);

module.exports = router;
