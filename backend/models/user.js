const mongoose = require("mongoose")
const crypto = require("crypto")
const uuid = require("uuid/v1")

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
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
    this.salt = uuid()
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
