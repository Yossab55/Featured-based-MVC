import express from "express";
import cookieParser from "cookie-parser";
// import morgan from "morgan";
import { ErrorHandel } from "./middlewares/Errors.middleware.js";
const app = express();

//Todo I guess you can I edit id
//Todo:Logging
process.on("uncaughtException", (error) => {
  console.trace();
  console.log(error);
  process.exit(1); // escape for you're life man
});

//Todo:Logging
process.on("unhandledRejection", (error) => {
  console.log(error);
});

// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routers

app.use(ErrorHandel);
export { app };
