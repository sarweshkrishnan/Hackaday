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
    console.log(config.apiEndpoint + "projects?api_key=" + config.apiKey)
    request.get({
        url: config.apiEndpoint + "projects?api_key=" + config.apiKey
    }, function(err, response, body) {
        console.log(body)
    })
});

module.exports = router