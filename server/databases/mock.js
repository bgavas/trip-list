const { ObjectID } = require('mongodb');

module.exports = {
    users: [{
        _id: new ObjectID(),
        name: 'Burak',
        surname: 'Uzun',
        username: 'username1',
        password: '' // This password is hashed. Plain password is 123456
    }, {
        _id: new ObjectID(),
        name: 'Ezgi',
        surname: 'Selvi',
        username: 'username2',
        password: '' // This password is hashed. Plain password is 654321
    }]
}