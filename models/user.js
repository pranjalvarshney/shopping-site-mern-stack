const mongoose = require("mongoose")
const crypto = require("crypto")
const { v1 } = require("uuid")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    encryptedpassword: {
      type: String,
      trim: true,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
      // 0 - User
      // 1 - Admin
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password
    this.salt = v1()
    this.encryptedpassword = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encryptedpassword
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return ""
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex")
    } catch (err) {
      return ""
    }
  },
}

module.exports = mongoose.model("User", userSchema)
