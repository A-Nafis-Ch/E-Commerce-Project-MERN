const bcrypt = require('bcrypt')

const data = {
    users: [
        {
            name: 'Nafis Chowdhury',
            email: 'abdullahnafis256@gmail.com',
            password: bcrypt.hashSync('12345',10),
            phone: '+8801686456345',
            address: 'dhaka, bangladesh',
        },

        {
            name: 'Vanilla Rose',
            email: 'vanillarose25@hotmail.com',
            password: bcrypt.hashSync('873452',10),
            phone: '+8801876645634',
            address: 'sylhet, bangladesh',
        },
    ]
}

module.exports = data;