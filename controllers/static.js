var express = require('express');
var route = express.Router()

route.use(express.static(__dirname+"/../assets"));

var options = {
    root: __dirname + "/../layouts"
};

route.get("/", function (req, res, next) {
    res.sendFile("Botiga.html", options);
});

module.exports = route
