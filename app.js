// Load required modules 
let express = require("express");
let bodyParser = require("body-parser");

// Load API files
const projectApi = require('./api/projectApi.js');

// Store the express object
let app = express();

// to support URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.get('/api/projects/', projectApi);

let distDir = __dirname + "/public";
app.use(express.static(distDir));

app.get('/', function(req, res) {
    res.sendFile(distDir + '/index.html');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.send('what???', 404);
});
  

// Initialize the app.
let server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});
