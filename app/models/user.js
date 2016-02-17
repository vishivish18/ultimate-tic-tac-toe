var db = require('./db')
var user = db.Schema({
    name: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true
    },    
    phone: {
        type: String,
        required: true,        
    }
})

module.exports = db.model('User', user)
