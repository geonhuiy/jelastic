"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./database/db");
const stationRoute = require("./routes/stationRoute");
const connectionRoute = require("./routes/connectionRoute");
const connectionTypesRoute = require("./routes/connectionTypesRoute");
const currentTypesRoute = require("./routes/currentTypesRoute");
const levelsRoute = require("./routes/levelsRoute");

app.use(express.json()); //parsing application/json
app.use(express.urlencoded({ extended: true })); //parsing application/form-urlencoded

app.use("/station", stationRoute);
app.use("/connection", connectionRoute);
app.use("/connectionTypes", connectionTypesRoute);
app.use("/currentTypes", currentTypesRoute);
app.use("/levels", levelsRoute);

db.on("connected", () => {
  app.listen(3000);
});
