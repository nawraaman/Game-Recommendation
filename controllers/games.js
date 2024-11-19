const express = require('express')
const router = express.Router()

const game = require('../models/game')
router.get('/new', async (req, res) => {
  res.render('games/new.ejs')
})
router.post('/', async (req, res) => {
  req.body.userId = req.session.user._id
  await game.create(req.body)
  res.redirect('/games')
})

router.get('/', async (req, res) => {
  try {
    const populatedGames = await game.find({}).populate('userId')

    // Add the following:
    res.render('games/index.ejs', {
      games: populatedGames
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:gameId', async (req, res) => {
  try {
    const populatedGames = await game
      .findById(req.params.gameId)
      .populate('userId')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:gameId', async (req, res) => {
  try {
    const game = await game.findById(req.params.gameId)
    if (game.userId.equals(req.session.user._id)) {
      await game.deleteOne()
      res.redirect('/games')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})
router.get('/:gameId/edit', async (req, res) => {
  try {
    const currentGame = await game.findById(req.params.gameId)
    res.render('games/edit.ejs', {
      game: currentGame
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:gameId', async (req, res) => {
  try {
    const currentGame = await game.findById(req.params.gameId)
    if (currentGame.userId.equals(req.session.user._id)) {
      await currentGame.updateOne(req.body)
      res.redirect('/games')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router
