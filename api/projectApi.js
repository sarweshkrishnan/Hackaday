// Load required modules
let express = require('express');
let request = require('request');

let config = require('../config');
let router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
    // build API url
    apiEndpoint = config.apiEndpoint + "projects?api_key=" + config.apiKey;

    // make API call to Hackaday.io
    request.get({
        url: apiEndpoint
    }, function(err, response, body) {
        if (err || response.statusCode != 200)
        {
            console.log("Error connecting to Hackaday API: ", err);
            res.status(500).send("Error with Hackaday API");
        }
        else
        {
            let projects = [];
            try {
                projects = JSON.parse(body).projects;
            }
            catch(err) {
                console.log("Error with parsing: ", err);
            }
            res.render('index', {projects: projects});
        }
    })
});

module.exports = router