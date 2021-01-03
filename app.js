const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const morgan = require("morgan")
// const path = require("path")

//middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routes
app.use("/api", require("./routes/auth"))
app.use("/api", require("./routes/user"))
app.use("/api", require("./routes/category"))
app.use("/api", require("./routes/product"))
app.use("/api", require("./routes/blog"))
app.use("/api", require("./routes/orders"))
app.use("/api", require("./routes/stripePay"))

// mongodb connection
const uri = process.env.MONGO_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("DB Connected")
  })
  .catch((err) => console.log(err))

// if production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"))
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   })
// }

// listen to server
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server started at PORT: ${port} successfully`)
})
