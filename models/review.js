const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
