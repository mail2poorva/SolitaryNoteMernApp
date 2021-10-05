const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
require("dotenv").config();
require("../db/connection");

const cookieparser = require("cookie-parser");
router.use(cookieparser());

router.get("/", (req, res) => {
  res.send("Hello World! from router");
});

// POST METHOD FOR REGISTERING USER

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !cpassword || !password) {
    return res.status(422).json({ error: "Plz fill the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "password not matching" });
    } else {
      const user = new User({
        name: name,
        email: email,
        phone: phone,
        work: work,
        password: password,
        cpassword: cpassword,
      });

      await user.save();

      res.status(201).json({ message: "User Registered successfully." });
    }
  } catch (e) {
    console.log(e);
  }
});

// POST METHOD FOR LOGIN USER

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    let token;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill the details properly." });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now(), 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Check login credentials" });
      } else {
        res.status(200).json({ message: "User Logged in successfully" });
      }
    } else {
      res.status(400).json({ error: "Check Invalid credentials" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

// about us section of the website

router.get("/profile", authenticate, (req, res) => {
  console.log(`hello my about`);
  res.send(req.rootUser);
});

//  get user data for contact us and home page
router.get("/getdata", authenticate, (req, res) => {
  console.log(`hello my about`);
  res.send(req.rootUser);
});

router.post("/contactform", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error from contact");
      return res.json({ error: "Please fill all the details properly " });
    }

    const userContact = await User.findOne({ _id: req.userID });
    console.log("contactform---" + userContact.name);
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(200).json({ message: "your message saved successfully" });
    }
  } catch (e) {
    console.log("1------" + e);
  }
});

router.post("/blogpost", authenticate, async (req, res) => {
  try {
    console.log(req.body);
    const { title, description } = req.body;
    if (!title || !description) {
      return res.json({ error: "Please check the field" });
    }
    const userBlog = await User.findOne({ _id: req.userID });
    // console.log(userBlog);

    if (userBlog) {
      const userBlogPost = await userBlog.addBlog(title, description);
      userBlog.save();
      res.status(200).json({ message: "Note saved successfully" });
    }
  } catch (e) {
    console.log("error in auth in blog post" + e);
  }
});

//  get user data for contact us and home page
router.get("/getblog", authenticate, (req, res) => {
  console.log(`hello my blogs`);
  res.send(req.rootUser);
});

// user logout function

router.get("/logout", (req, res) => {
  console.log("hello from logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
