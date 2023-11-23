import mongoose from "mongoose";
import "dotenv/config";

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.ttvigle.mongodb.net/db?retryWrites=true&w=majority`;

function connectToDB() {
  console.log("connecting to database", process.env.USER_NAME);
  return mongoose
    .connect(url)
    .then(() => console.log("connected to database"))
    .catch((e) => console.log("error connecting to database", e.message));
}
export default connectToDB;
