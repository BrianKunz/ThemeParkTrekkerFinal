import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";
import tripController from "./controllers/trip.controller";
import commentController from "./controllers/comment.controller";
import morgan from "morgan";
import cors from "cors";
const session = require("express-session");
const secret = process.env.SESSION_SECRET || "default-secret";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/favicon.ico", (_, res) => {
  res.status(204).end();
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// app.use(sessionMiddleware);

app.use("/users", userController);
app.use("/posts", postController);
app.use("/trips", tripController);
app.use("/comments", commentController);

app.get("/", (_, res) => {
  res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`Server is starting 🚀 on PORT: ${PORT}`);
});
