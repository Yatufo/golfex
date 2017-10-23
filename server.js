var express = require('express')
var app = express()
var Client = require('node-rest-client').Client;

var client = new Client();
var ELASTIC_SEARCH_SERVER = process.env.ELASTIC_SEARCH_SERVER
app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/places/best', function (req, res) {

  // direct way
  client.get(ELASTIC_SEARCH_SERVER, function (data, response) {
      // raw response
      res.send(data);
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
