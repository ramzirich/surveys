const express = require("express");
// const { db } = require("./configs/db.configs");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
// require("dotenv").config();

// app.get("/hello", (req, res) => {
//   console.log("HELLO!!");
// });

// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const answerRoutes = require("./routes/answer.routes");
app.use("/answer", answerRoutes);

const questionRoutes = require("./routes/question.routes");
app.use("/question", questionRoutes);

const questionRoutes = require("./routes/survey.routes");
app.use("/survey", questionRoutes);

// to do routes
// const todoRoutes = require("./routes/todo.routes");
// const { authMiddleware } = require("./middlewares/auth.middleware");
// app.use("/todo", authMiddleware, todoRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);

  //   db.connect((err) => {
  //     if (err) {
  //       console.log("Error connecting to db: ", err);
  //     } else {
  //       console.log("Connected to MySQL DB...");
  //     }
  //   });

  connectToMongoDB();
});
