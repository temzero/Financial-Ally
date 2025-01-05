const mongoose = require('mongoose')
const express = require('express')
const app = express()
const userRouter = require('./routes/user.route')
const cors = require('cors')
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// User interact with database
app.use('/', userRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://temzero:temzero@userdb.3n3h3.mongodb.net/User?retryWrites=true&w=majority&appName=userDB', {
  serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
  socketTimeoutMS: 45000, // Socket timeout after 45 seconds
})
  .then(() => console.log("Connected to the database"))
  .catch(() => console.log("Unable to connect to the database."))