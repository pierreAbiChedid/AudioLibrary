const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const libraryRoutes = require("./routes/library");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(libraryRoutes);

mongoose
  .connect(
    "mongodb+srv://pierre:sEP6C4B90697701@cluster0.zg13b.mongodb.net/AudioLibrary?retryWrites=true&w=majority"
  )
  .then(() => {})

  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
