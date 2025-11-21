import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";

const app = express();

app.use(express.json()); // json으로 통신

// Router middleware
app.use("/post", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404); // no page
});

app.listen(8080);
