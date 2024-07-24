const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//models
const User = require("./models/Users");
const Question = require("./models/Questions");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connecting to database
const mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.mhaamym.mongodb.net/QuizApp`;
mongoClient = mongoose.connect(mongoUrl);

//getting all users data
app.get("/user", (req, res) => {
  User.find({}).then((data) => {
    res.send(data);
  });
});

//post request to add a user in database
app.post(
  "/add-user",
  body("Email", "Enter a Valid Email ID.").isEmail(),
  body("Password", "Password must be 5 chars. ").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPwd = await bcrypt.hash(req.body.Password, salt);

    try {
      const emailCheck = await User.find({ Email: req.body.Email });
      if (emailCheck.length) {
        console.log(emailCheck.length);
        return res.send({
          success: false,
          errorMsg: "Email is Already registered.",
        });
      }
      User.create({
        Email: req.body.Email,
        UserName: req.body.UserName,
        Password: bcryptPwd,
        Mobile: req.body.Mobile,
        Score: 0,
        HasAttended: false,
      }).then(() => {
        res.send({ success: true });
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);

//getting a perticular userDetails
app.get("/user/:email", (req, res) => {
  User.find({ Email: req.params.email }).then((data) => {
    res.send(data);
  });
});

//updating perticular user details
app.put("/user/update", async (req, res) => {
  // const salt = await bcrypt.genSalt(10);
  // const bcryptPwd = await bcrypt.hash(req.body.Password, salt);

  User.findOneAndUpdate(
    { Email: req.body.Email },
    {
      Email: req.body.Email,
      Score: req.body.Score,
      HasAttended: req.body.HasAttended,
    },
    { new: true }
  ).then((data) => {
    console.log(data);
    res.send({ success: true });
  });
});

//logining in user by matching password and giving jwt authToken.
app.post(
  "/login",
  body("Email", "Enter a Valid Email ID.").isEmail(),
  body("Password", "Password must be 5 chars. ").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    try {
      const user = {
        Email: req.body.Email,
        Password: req.body.Password,
      };
      User.findOne({ Email: user.Email }).then(async (data) => {
        if (data) {
          const pwdCompare = await bcrypt.compare(user.Password, data.Password);
          if (pwdCompare) {
            const jwtData = {
              jwtUser: {
                id: data.UserId,
              },
            };
            const authToken = jwt.sign(jwtData, process.env.JWT_SECRET);
            return res.send({ success: true, authToken: authToken });
          } else {
            return res.send({
              success: false,
              errorMsg: "Incorrect Password.",
            });
          }
        } else {
          return res.send({
            success: false,
            errorMsg: "Email Id not available.",
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);

//getting admin details
app.get("/admin", (req, res) => {
  mongoClient.then(() => {
    mongoose.connection.db
      .collection("admin")
      .find({})
      .toArray()
      .then(async (data) => {
        res.send(data);
      })
      .catch((e) => console.log(e));
  });
});

//logging in admin
app.post("/admin-login", (req, res) => {
  mongoClient.then(() => {
    mongoose.connection.db
      .collection("admin")
      .findOne({ Email: req.body.Email })
      .then(async (data) => {
        if (data) {
          const pwdCompare = req.body.Password === data.Password;
          if (pwdCompare) {
            return res.send({ success: true, adminBoard: true });
          } else {
            return res.send({
              success: false,
              errorMsg: "Incorrect Password.",
            });
          }
        } else {
          return res.send({
            success: false,
            errorMsg: "Email Id not available.",
          });
        }
      });
  });
});

//geting all questions
app.get("/questions", (req, res) => {
  Question.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

//post request to add a question
app.post(
  "/add-question",
  body("Question", "Tilte must be 15 chars. ").isLength({ min: 5 }),
  body("Options", "Url must be given. ").isLength({ min: 6 }),
  body("CorrectOption", "Provide correct option. ").isNumeric({ min: 1 }),
  body("Points", "Provide marking points. ").isNumeric({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Question.findOne({ Question: req.body.Question }).then((data) => {
      if (!data) {
        Question.create({
          Question: req.body.Question,
          Options: req.body.Options.split(","),
          CorrectOption: req.body.CorrectOption,
          Points: req.body.Points,
        })
          .then(() => {
            res.send({ success: true });
          })
          .catch((err) => console.log(err.message));
      } else {
        res.send({ success: false, errorMsg: "Question Already Exist." });
      }
    });
  }
);
app.put("/edit-question", (req, res) => {
  Question.findOneAndUpdate(
    { _id: req.body.Id },
    {
      Question: req.body.Question,
      Options: req.body.Options.split(","),
      CorrectOption: req.body.CorrectOption,
      Points: req.body.Points,
    },
    { new: true }
  )
    .then((data) => {
      console.log(data);
      if (data) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    })
    .catch((e) => {
      res.send({ success: false });
      console.log(e.message);
    });
});
app.delete("/delete-question/:id", (req, res) => {
  const Id = req.params.id;
  Question.findOneAndDelete({ _id: Id })
    .then(() => res.send({ success: true }))
    .catch((e) => console.log(e.message));
});

app.listen(4040, (req, res) => {
  console.log("Listening to port 4040:  http://localhost:4040/");
});
