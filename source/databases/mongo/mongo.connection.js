import mongoose from "mongoose";
import { mongooseConfig } from "../../config/mongoose.config.js";

try {
  await mongoose.connect(mongooseConfig.uri);
} catch (error) {
  throw error; //sever error
}

mongoose.connection.on("error", (err) => {
  console.log(err); // todo adjust the error handle
});
