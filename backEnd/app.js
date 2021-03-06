"use strict";

var SwaggerExpress = require("swagger-express-mw");
var app = require("express")();
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }
  app.use(cors());
  app.use(morgan("tiny"));
  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;

  mongoose.Promise = bluebird;
  console.log(
    `container is up with ENV var DOCKER = ${JSON.stringify(
      process.env.DOCKER
    )}`
  );
  let mongoUrl = process.env.mongoUrl;
  mongoose.connect(mongoUrl, { useNewUrlParser: true });
  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
  mongoose.connection.once("open", () => {
    console.log(`server is listening on ${port}`);
    console.log("API server is connected to DB!");
    app.listen(port);
  });
});
