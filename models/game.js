const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
  {
    gameName: {
      type: String,
      required: true,
      minlength: [3, 'Name must be more than 3 characters'],
      maxlength: [10, 'This is too much man, chill !']
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    },
    averageRating: {
      type: Number,
      default: 0
    }
  },
  {
    // This will create two fields in the table (createdAT, updatedAT) automatically and updated by mongoDB
    timestamps: true
  }
)

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
