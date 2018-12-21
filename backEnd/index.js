var express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');

app.use(cors());
// if(config.env !== "test"){app.use(logger('dev'));}

// const viewsRouter = require('./api/views');
// app.use('/views',viewsRouter);

app.listen(4000, () => console.log('testing volume on on http://localhost:4000'));