const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/mutudu")
  .then(() => console.log("hello, this is mongo"))
  .catch((err) => console.error(err));

const { User } = require("./models/User");
const { Task } = require("./models/Task");
const { Group } = require("./models/Group");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
  session({
    secret: "hello this is secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.post("/new-user", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name,
    email,
    password,
  });
  newUser.save((err) => {
    if (err) console.error(err);
    else console.log("user saved");
    res.redirect("/");
  });
});

app.post("/new-task", (req, res) => {
  const { user, title, content } = req.body;
  const date = Date.now();
  const newTask = new Task({
    title,
    content,
    date,
  });
  User.findOne({ email: user }, (err, foundUser) => {
    if (err) {
      console.error(err);
      res.redirect("/");
    } else {
      foundUser.tasks.push(newTask);
      foundUser.save((err) => {
        if (err) {
          console.error(err);
          res.redirect("/");
        } else {
          console.log("task saved");
          res.redirect("/");
        }
      });
    }
  });
});

app.post("/new-group", async (req, res) => {
  const { name, user } = req.body;
  const groupCreator = await User.findOne({ email: user });
  console.log(groupCreator);
  const newGroup = new Group({
    name,
  });
  try {
    const groupNameExists = await Group.find({ name: name });
    if (groupNameExists.length > 0) {
      console.log("group name exists");

      res.redirect("/");
    }
    newGroup.save();
    console.log("group saved.");

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

app.listen(3000, () => console.log("hello"));
