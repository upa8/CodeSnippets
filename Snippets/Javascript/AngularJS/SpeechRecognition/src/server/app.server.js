var express = require('express');
var app = express();
var path = require('path');
var jsonFile = require('jsonfile');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('../client'));

app.get('/images', function(req, res) {
    res.sendFile(path.join(__dirname, '/data/images.json'));
});

app.post('/images', function(req, res) {
    jsonFile.writeFileSync(path.join(__dirname,
        '/data/images.json'), req.body);

    res.sendStatus(200);
});

app.get('/settings', function(req, res) {
    res.sendFile(path.join(__dirname, '/data/settings.json'));
});

app.post('/settings', function(req, res) {
    jsonFile.writeFileSync(path.join(__dirname,
        '/data/settings.json'), req.body);

    res.sendStatus(200);
});

app.listen(3000, function() {
    console.log("Running app server");
});
