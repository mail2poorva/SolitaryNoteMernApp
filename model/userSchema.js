const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const date = new Date().toString();

var date = new Date();

var today = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;

console.log(today);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now(),
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
      },
      date: {
        type: String,
        default: Date.now(),
      },
    },
  ],
  blogs: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        default: today,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// to generate token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    console.log(e);
  }
};

// stored the messages

userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({
      name: name,
      email: email,
      phone: phone,
      message: message,
    });
    await this.save();
    return this.messages;
  } catch (e) {
    console.log(e);
  }
};

// adding blogs in the database

userSchema.methods.addBlog = async function (title, description) {
  try {
    this.blogs = this.blogs.concat({
      title,
      description,
    });
    await this.save();
    return this.blogs;
  } catch (e) {
    console.log("error in adding blog userShcmea" + e);
  }
};

const User = mongoose.model("registration", userSchema);
module.exports = User;
