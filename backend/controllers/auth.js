exports.signup = (req, res) => {
  const data = req.body
  console.log(data)
  res.json({
    msg: "User signup",
  })
}
