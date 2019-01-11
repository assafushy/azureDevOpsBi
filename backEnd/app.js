'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const cors = require('cors');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  app.use(cors());
  
  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  
  mongoose.Promise = bluebird;
  mongoose.connect('mongodb://localhost:27017/azuredevopsbi',{ useNewUrlParser: true });
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open',()=>{
    console.log(`server is listening on ${port}`);  
    console.log("API server is connected to DB!");
    app.listen(port);
  });

});
