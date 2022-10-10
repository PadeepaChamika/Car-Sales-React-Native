const express = require('express')
const app = express()
const port = 4000

const userController = require('./routes/User')
const carController = require('./routes/Car')

app.use(express.json())

app.use('/users', userController)
app.use('/cars', carController)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})