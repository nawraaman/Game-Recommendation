const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: false
    },
    date: {
      type: date,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    }
  },
  {
    // This will create two fields in the table (createdAT, updatedAT) automatically and updated by mongoDB
    timestamps: true
  }
)

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
