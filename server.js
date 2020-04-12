"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./database/db");
const graphQlHttp = require("express-graphql");

//Routes
const stationRoute = require("./routes/stationRoute");
const connectionRoute = require("./routes/connectionRoute");
const connectionTypesRoute = require("./routes/connectionTypesRoute");
const currentTypesRoute = require("./routes/currentTypesRoute");
const levelsRoute = require("./routes/levelsRoute");

//GraphQl
const schema = require("./schema/schema");

app.use(express.json()); //parsing application/json
app.use(express.urlencoded({ extended: true })); //parsing application/form-urlencoded

//REST paths
app.use("/station", stationRoute);
app.use("/connection", connectionRoute);
app.use("/connectionTypes", connectionTypesRoute);
app.use("/currentTypes", currentTypesRoute);
app.use("/levels", levelsRoute);

//GraphQl path
app.use("/graphql", (req, res) => {
  graphQlHttp({
    schema,
    graphiql: true,
    context: { req, res },
  })(req, res);
});

db.on("connected", () => {
  app.listen(3000);
});
