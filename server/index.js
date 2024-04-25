const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")("sk_test_51P4sG6032hYtnpnt9SnGMpH7PyPhVBNckVepBft2DPFBcWCWbJLDOjNw3FoIyfp0RwI5k9lNB90cxyGPr8gyCYmy00V4nLZWno");

//DB Connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("db connected");
}

//middleware
server.use(cors());
server.use(bodyParser.json());

//API
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  savedEvent: [{ type: Number, ref: "Event" }],
});

const EventSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  heading: { type: String, required: true },
  date: { type: { year: Number, month: String }, required: true },
  location: { type: String, required: true },
  imgURL: { type: String, required: true },
  TicketPrice: { type: Number, required: true },
});

const UserSavedEvents = new mongoose.Schema({
  username: {type: String, required: true},
  savedEvent: [{ type: Number, ref: "Event" }],
})

const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", EventSchema);
const SaveUserEvent = mongoose.model("SaveUserEvent", UserSavedEvents);

// Register a new user
server.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    return res
      .status(400)
      .json({
        message: "Username or email already in use, please try another one.",
      });
  }
  const emptyarr = [0]
  const newUser = new User({ username, email, password });
  const newUserSavedEvents = new SaveUserEvent({username});

  await newUserSavedEvents.save();
  await newUser.save();

  res.json({ message: "User registered successfully." });
});

// Login route
server.post("/login", async (req, res) => {
  const { username, password } = req.body;

  
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Username doesnt exist in the database." });
  }

  if (password !== user.password) {
    return res.status(400).json({ message: "Incorrect password." });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({
    message: "Login successful.",
    token,
    userID: user._id,
    username: user.username,
  });
});

//get all event on homepage
server.get("/", async (req, res) => {
  try {
    const response = await Event.find({});
    res.json(response);
  }catch (err) {
    res.json(err);
  }
});

//create an event
server.post("/create-event", async (req, res) => {
  const evnt = new Event(req.body);
  try {
    const response = await evnt.save();
    res.json({
      response,
      message:
        "The event has been successfully created. Please visit our Home page and refresh.",
    });
  } catch (err) {
    res.json(err);
  }
});

//saving an event by a specific user;
server.put("/", async (req, res) => {
  try {
    const evnt = await Event.findById(req.body.eventID);
    const user = await User.findById(req.body.userID);
    user.savedEvent.push(evnt);
    await user.save();
    res.json({ savedEvent: user.savedEvent });
  } catch (err) {
    res.json(err);
  }
});

// Start the server
server.listen(8080, () => {
  console.log("server started");
});
