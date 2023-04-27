import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";
import tripController from "./controllers/trip.controller";
import commentController from "./controllers/comment.controller";
import morgan from "morgan";
import cors from "cors";
// import sessionMiddleware from "./services/sessionMiddleware";

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

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
