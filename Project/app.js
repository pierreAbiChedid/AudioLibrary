const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


const User = require('./models/user')

const app = express();

const albumRoutes = require("./routes/album");
const categoryRoutes = require("./routes/category");
const songRoutes = require("./routes/song");
const userRoutes = require("./routes/user");

const MONGODB_URI =
  "mongodb+srv://pierre:sEP6C4B90697701@cluster0.zg13b.mongodb.net/AudioLibrary?retryWrites=true&w=majority";


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(albumRoutes);
app.use(categoryRoutes);
app.use(songRoutes);
app.use(userRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })

  .catch((err) => {
    console.log(err);
  });
