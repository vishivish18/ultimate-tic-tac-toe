var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds059145.mongolab.com:59145/heroku_wqfjcfn0', function() {

    console.log('mongodb connected');
})
mongoose.connection.on('open', function(ref) {
    console.log('Connected to Mongo server...');
});

module.exports = mongoose;
