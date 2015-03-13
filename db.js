var mongoose = require("mongoose");
mongoose.connect("mongodb://ysf:ysf123@ds053300.mongolab.com:53300/productes", function() {
    console.log('Connectat a mongodb');
});
module.exports = mongoose;
