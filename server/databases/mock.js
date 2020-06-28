const { ObjectID } = require('mongodb');

module.exports = {
    users: [{
        _id: new ObjectID(),
        name: 'Burak',
        surname: 'Uzun',
        username: 'username1',
        // The plain password is not kept in db. It is put here for test purposes
        plainPassword: '123456',
        // Hashed password
        password: '$2a$10$LcD9gEq5aTxHsAGVgpKSlus.QydT/RFBebbCidY0uIdkgygNXN2hi'
    }, {
        _id: new ObjectID(),
        name: 'Ezgi',
        surname: 'Selvi',
        username: 'username1',
        // The plain password is not kept in db. It is put here for test purposes
        plainPassword: '654321',
        // Hashed password
        password: '$2a$10$flhA/gDklcWrVgpU8DvhDuAcT/aTtb8EXqYNwKtpm2kafbKWRYZza'
    }]
}