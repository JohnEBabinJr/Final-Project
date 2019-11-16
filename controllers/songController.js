const db = require("../models/track.js");

//as of 11/5 @ 5:30pm, comments below outline what functions we will need, not what they are currently doing
module.exports = {
  findAll: function(req, res) {
    //we will need a 'findAll by room id' to access specific rooms, which would actually be a 'findById', I think
    db.find(req.query)
      //.sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    //Might need a 'findById' to play next track to the player
    db.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByRoomId: function(req, res) {
    //Might need a 'findById' to play next track to the player
    db.find({ roomId: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    //add track to playlist?
    db.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    //unsure if we'll need to update other than delete once tracks/playlists are stored
    db.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    //remove track from playlist
    db.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
