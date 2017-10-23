var config = require('./config.js')
var express = require('express')
var _ = require('lodash');
var app = express()
var client = require('unirest');
var ELASTIC_SEARCH_SERVER = process.env.ELASTIC_SEARCH_SERVER
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('Hello World')
})


app.get('/destinations', function(req, res) {

  // direct way
  client.post(ELASTIC_SEARCH_SERVER + "/golf/_search")
    .headers(config.defaultHeaders)
    .send(config.destinationEsQuery)
    .end(function(response) {
      if (response.body) {
        var destinations = _.map(response.body.aggregations.results.buckets, function(bucket) {
          return {
            name: bucket.key,
            rating: bucket.rating.value,
            coords: bucket.geo.location
          }
        });

        // raw response
        res.send(destinations);
      } else {
        console.log(response);
        res.send([]);
      }
    });
});

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
