const express = require('express')
const route = express.Router()

const User = require('../models/user')

route.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    res.render('games/index.ejs', {
      games: currentUser.games
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
route.get('/new', async (req, res) => {
  res.render('games/new.ejs')
})
route.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session._id)
    currentUser.games.push(req.body)
    await currentUser.save()
    res.redirect(`/user/${currentUser._id}/games`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
route.get('/:gameId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
  } catch (error) {}
})
