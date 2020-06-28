const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    key: {
        type: String
    },
    value: {
        type: String
    },
    counts: {
        type: [Number]
    }
});

// Create model
let User = mongoose.model('User', UserSchema);

module.exports = User;
