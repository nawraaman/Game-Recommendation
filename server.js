const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const isSignedIn = require('./middleware/is-Signed-in')
const passUserToView = require('./middleware/pass-user-to-view')
const port = process.env.PORT ? process.env.PORT : '3000'
const path = require('path')
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passUserToView)
app.use((req, res, next) => {
  if (req.session.message) {
    console.log('req.session.message', req.session.message)
    res.locals.message = req.session.message
    req.session.message = null
  } else {
    res.locals.message = null
  }
  next()
})
// Require Controller
const authController = require('./controllers/auth')
const gamesController = require('./controllers/games')
// Landing Page
app.get('/', async (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/games`)
  } else {
    res.render('index.ejs')
  }
})
app.get('/vip-lounge', isSignedIn, (req, res) => {
  res.send(`Welcome to the party ${req.session.user.username}`)
})
// Use Controllers
app.use('/auth', authController)
app.use(isSignedIn)
// Means if there is a URL from the browser same as the below then it will use the app controller
app.use('/users/:userId/games', gamesController)
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}`)
})
