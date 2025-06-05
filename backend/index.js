const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
require("dotenv").config();
var cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const commentRouter = require("./routes/comment.routes");
const session = require("express-session");
const app = express();
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,}
));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.static("./uploads"))

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`"server is connect"`);
  } catch {
    console.log("server is disconnetct ");
  }
});
