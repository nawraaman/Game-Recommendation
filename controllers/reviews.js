const express = require('express')
const router = express.Router()
const Review = require('../models/review')

router.post('/', async (req, res) => {
  try {
    const review = new Review({
      rating: req.body.rating,
      comment: req.body.comment,
      userId: req.session.user._id,
      gameId: req.params.gameId
    })
    await review.save()
    res.redirect(`/games/${req.params.gameId}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:gameId/reviews/:reviewId/edit', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
    if (review.userId.equals(req.session.user._id)) {
      res.render('reviews/edit.ejs', { review, gameId: req.params.gameId })
    } else {
      res.send("You don't have permission to edit this review.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:gameId/reviews/:reviewId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
    if (review.userId.equals(req.session.user._id)) {
      review.rating = req.body.rating
      review.comment = req.body.comment
      await review.save()
      res.redirect(`/games/${req.params.gameId}`)
    } else {
      res.send("You don't have permission to update this review.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:gameId/reviews/:reviewId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
    if (review.userId.equals(req.session.user._id)) {
      await review.remove()
      res.redirect(`/games/${req.params.gameId}`)
    } else {
      res.send("You don't have permission to delete this review.")
    }
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

module.exports = router
