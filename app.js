const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcyrpt = require("bcryptjs");
const MongoStore = require("connect-mongo");

const mongoURL = process.env.MONGO_URL;
mongoose
  .connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("DB connection success"))
  .catch((err) => console.log(err));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Session setup
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: mongoURL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

//Passport Auth
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App listening on port`)
);
