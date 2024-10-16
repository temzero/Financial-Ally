const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 4000
const userRouter = require('./routes/user.route')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Home
app.get('/', (req, res) => {
  res.send('CS50 final project - src')
})

// User interact with database
app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://temzero:temzero@userdb.3n3h3.mongodb.net/Node-API?retryWrites=true&w=majority&appName=userDB')
  .then(() => console.log("Connected to the database"))
  .catch(() => console.log("Unable to connect to the database."))