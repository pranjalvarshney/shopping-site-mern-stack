const express = require("express")
const app = express()

const mongoose = require("mongoose")

const uri = process.env.MONGO_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected")
  })
  .catch((err) => console.log(err))

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server stated at PORT: ${port} successfully`)
})
