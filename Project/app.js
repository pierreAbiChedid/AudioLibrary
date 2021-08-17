const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv/config");

const albumRoutes = require("./albums/routes");
const categoryRoutes = require("./categories/routes");
const songRoutes = require("./tracks/routes");
const userRoutes = require("./users/routes");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(albumRoutes);
app.use(categoryRoutes);
app.use(songRoutes);
app.use(userRoutes);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then((result) => {
    const server = app.listen(3000);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })

  .catch((err) => {
    console.log(err);
  });
