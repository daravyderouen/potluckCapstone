require('dotenv').config()
const port = process.env.PORT || 4000
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const { SERVER_PORT } = process.env
const { seed, getGuests, createGuest } = require('./controller.js')


app.use(express.json())
app.use(cors())

app.use(express.static("client"));
app.get('/', (req, res) => {
  res.sendFile('/index.html')

})








app.post('/seed', seed)

app.get('/guests', getGuests)
app.post('/guests', createGuest)

/*
app.get("/index.css", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.css"));
    //rollbar.log('They need CSS!')
  });
  app.get("/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.js"));
    //rollbar.log('Hey, they started me up again')
  });
*/






//app.delete('/guests/:id', deleteGuest)


//app.use(rollbar.errorHandler());







app.listen(port, () => {
  console.log(`My server is on fiya ${port}`)
})