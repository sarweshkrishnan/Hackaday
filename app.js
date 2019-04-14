// Load required modules 
let express = require("express");
let bodyParser = require("body-parser");
let path = require('path')

// Load API files
const projectApi = require('./api/projectApi.js');

// Store the express object
let app = express();

// to support URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// configure ejs view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// re-direct to projects module
app.use('/api/projects/', projectApi);

// to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

// The 404 Route
app.get('*', function(req, res){
    res.status(404).send('what???');
});
  

// Initialize the app.
let server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});
