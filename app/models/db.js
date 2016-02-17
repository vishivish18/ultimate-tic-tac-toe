var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/uttt', function() {
    console.log('mongodb connected');
})

module.exports = mongoose;
