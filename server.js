var express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3003,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/app/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

// console.log(__dirname + '/app/views')
var routes = require('./app/routers/privateRoute');
routes(app);

app.listen(port);
console.log('running on: '+ port);