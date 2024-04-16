const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const uploadRouter = require("./routers/uploadRouter");
const globalErrorHandler = require("./controllers/errorController");
app.set("view engine", "ejs");
app.use(express.static("public"));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/", uploadRouter);
app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);

  // The next function accepts an argument that we use as the error object
  next(err);
});

// Global Error Handling Middleware for Operational error
const PORT = 5000;
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`${PORT}  has been touchec`);
});
