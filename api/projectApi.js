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

router.get(['/', '/:id'], function(req, res) {
    // get page number, default is 1
    let page = 1;
    if(req.params.id)
    {
        page = req.params.id;
    }

    // build API url
    let apiEndpoint = config.apiEndpoint + "projects?api_key=" + config.apiKey + "&per_page=" + config.projects.per_page + "&page=" + page;

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

            if(req.xhr)
            {
                res.render('acc', { page: page, projects: projects });
            }
            else
            {
                res.render('index', { page: page, projects: projects });
            }
        }
    })
});

module.exports = router;