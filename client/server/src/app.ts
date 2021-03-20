import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
import path from "path";
import bodyParser from "body-parser";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Priority serve any static files.

console.log("__dirname", __dirname);
app.use(express.static(path.resolve(__dirname, "../../../build")));

app.use(todoRoutes);

// __dirname / Users / katarzynawegorek / kwegorek / fullstack -
//   typescript -
//   mern -
//   todo / client / server / dist / js;
// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../../../build", "index.html"));
});

const uri: string = "mongodb://127.0.0.1:27017/mydatabase";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
