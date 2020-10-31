// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function timestamp(date) {
  return {
    unix: date.getTime(), 
    utc: date.toUTCString()
  };
}

app.get("/api/timestamp", function(req, res) {
  res.json(timestamp(new Date()));
});

app.get("/api/timestamp/:date_string", function(req, res) {

  let date;
  let millis = Number(req.params.date_string);

  if(isNaN(millis)) {
    date = new Date(req.params.date_string);
  } else {
    date = new Date(millis);
  } 

  if(isNaN(date.getTime())) {
    res.json({error: "Invalid Date"});
  } else {
    res.json(timestamp(date));
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
