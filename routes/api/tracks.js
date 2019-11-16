const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "/api/tracks"
router
  .route("/")
  .get(songController.findAll)
  .post(songController.create);

// Matches with "/api/tracks/:id"
router
  .route("/:id")
  .get(songController.findByRoomId)
  .put(songController.update)
  .delete(songController.remove);

module.exports = router;
