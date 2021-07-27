var express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3003,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./app/routers/privateRoute');
routes(app);

app.listen(port);
console.log('running on: '+ port);