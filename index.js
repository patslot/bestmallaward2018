'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.locals.escapeHtml = function(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};

var home = require('./routes/home.js')();
var detail = require('./routes/detail.js')();
var speech = require('./routes/speech.js')();
var secret = require('./routes/secret.js')();
var publicvote = require('./routes/public.js')();
var nominees = require('./routes/nominees.js')();
var result = require('./routes/result.js')();
var event = require('./routes/event.js')();
var history = require('./routes/history.js')();

app.use(express.static('public'));
app.use('/detail', express.static(__dirname + '/public'));
app.use('/secret', express.static(__dirname + '/public'));
app.use('/speech', express.static(__dirname + '/public/speech/'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/nominees', express.static(__dirname + '/public'));
app.use('/result', express.static(__dirname + '/public'));
app.use('/event', express.static(__dirname + '/public'));
app.use('/history', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});


app.get('/',home.render);
app.get('/detail',detail.render);
app.get('/speech',speech.render);
app.get('/secret',secret.render);
app.get('/public',publicvote.render);
app.get('/nominees',nominees.render);
app.get('/result',result.render);
app.get('/event',event.eventListing);
app.get('/event/:client',event.advRender);
app.get('/history',history.renderHistorylisting);
app.get('/history/:year',history.renderHistoryDetail);
// // POST method route
// app.post('/', function (req, res) {
//     res.send('POST request to the homepage')
// })

// app.use(function(err, req, res, next) {
//     console.error(JSON.stringify(err));
//     if (req.accepts(["text/html", "application/json"]) === "application/json") {
//       return res.status(500).json({status: 500, message: err});
//     }
//     return res.status(500).render("500");
//   });

// app.use(function(req, res) {
//     if (req.accepts(["text/html", "application/json"]) === "application/json") {
//       return res.status(404).json({status: 404, message: "not found"});
//     }
//     return res.status(404).render("404");
// });


app.set('port', process.env.PORT || 3330);

var runningServer = app.listen(app.get('port'), function() {
  console.log('listening on port ' + runningServer.address().port);
});