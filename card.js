const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("Card", CardSchema);

Card.getCardById = function (id, callback) {
  Card.findById(id, callback);
};

Card.getCardByUsername = function (username, callback) {
  const query = { username: username };
  Card.findOne(query, callback);
};

Card.addCard = function (newCard, callback) {
  newCard.save(callback);
};

Card.revCard = function (username, newCard, callback) {
  const query = { username: username };
  const update = {
    name: newCard.name, board: newCard.board,
  };
  Card.findOneAndUpdate(query, update, { new: true, useFindAndModify: false }, callback);
}

module.exports = Card;