const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routes
app.use("/api", require("./routes/auth"))

// mongodb connection
const uri = process.env.MONGO_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected")
  })
  .catch((err) => console.log(err))

// listen to server
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server stated at PORT: ${port} successfully`)
})
