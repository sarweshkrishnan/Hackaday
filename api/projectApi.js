let express = require('express')
let request = require('request')

let config = require('../config')
let router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function(req, res) {
    apiEndpoint = config.apiEndpoint + "projects?api_key=" + config.apiKey

    request.get({
        url: apiEndpoint
    }, function(err, response, body) {
        if (err)
        {
            console.log("Error connecting to Hackaday API: ", err)
            res.status(500).send("Error connecting to Hackaday API")
        }
        else if (response.statusCode != 200)
        {
            console.log("Error with Hackaday API: ", err)
            res.status(500).send("Error with Hackaday API")
        }
        else
        {
            res.status(200).send(JSON.parse(body))
        }
    })
});

module.exports = router