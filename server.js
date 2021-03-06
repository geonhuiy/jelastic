"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./database/db");
const passport = require("./utils/pass");
const graphQlHttp = require("express-graphql");

//Routes
const stationRoute = require("./routes/stationRoute");
const connectionRoute = require("./routes/connectionRoute");
const connectionTypesRoute = require("./routes/connectionTypesRoute");
const currentTypesRoute = require("./routes/currentTypesRoute");
const levelsRoute = require("./routes/levelsRoute");

//GraphQl schema
const schema = require("./schema/schema");

app.use(express.json()); //parsing application/json
app.use(express.urlencoded({ extended: true })); //parsing application/form-urlencoded
app.use("/modules", express.static("node_modules"));

//Helmet
const helmet = require('helmet');
app.use(helmet());

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

//Localhost and production server 
db.on("connected", () => {
  process.env.NODE_ENV = process.env.NODE_ENV || "development";
  if (process.env.NODE_ENV === "production") {
    require("./production")(app, process.env.PORT);
  } else {
    require("./localhost")(
      app,
      process.env.HTTP_PORT,
      process.env.HTTPS_PORT
    );
  }
});
