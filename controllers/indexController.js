const User = require("../models/User");
const Message = require("../models/Message");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const passport = require("passport");

exports.index_get = async (req, res, next) => {
  const posts = await Message.find().populate("user").exec();
  res.status(200).render("index", {
    user: req.user,
    posts: posts || [],
    admin: req.user?.membershipStatus === "admin",
  });
};

exports.log_in_get = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  }
  res.status(200).render("log-in", { user: req.user });
};

exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

exports.log_out_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.sign_up_get = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  }
  res.status(200).render("sign-up", { user: req.user });
};

exports.sign_up_post = async (req, res, next) => {
  bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      const result = await user.save();
      console.log(user);
      res.redirect("/log-in");
    } catch (err) {
      return next(err);
    }
  });
};

exports.new_post_get = (req, res, next) => {
  if (!req.user) {
    res.redirect("/log-in");
  }
  res.status(200).render("newpost", { user: req.user });
};

exports.new_post_post = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username });

    const newPost = new Message({
      user: user,
      messageTitle: req.body.title,
      messageContent: req.body.message,
    });

    await newPost.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.delete_post = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.body.postid);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
