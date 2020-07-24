const express = require("express")
const app = express()

const mongoose = require("mongoose")

const uri = `mongodb://localhost:27017/test`
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected")
  })
  .catch((err) => console.log(err))

const port = 4000
app.listen(port, () => {
  console.log(`Server stated at PORT: ${port} successfully`)
})
