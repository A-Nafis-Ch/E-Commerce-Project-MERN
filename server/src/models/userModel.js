const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../secret');

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'User name is required!'],
        trim: true, // empty space forbidden
        minlength: [3, 'Minimum 3 length character'],
        maxlength: [31, 'Maximum 31 length character'],


    },

    email: {
        type: String,
        required: [true, 'User email is required!'],
        trim: true, // empty space forbidden
        unique: true, // 1 email per user can use.
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);

            },

            message: 'Please enter a valid email.'
        },



    },

    password: {
        type: String,
        required: [true, 'User password is required!'],
        minlength: [6, 'Minimum 6 length character'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),



    },

    image: {
        type: String,
        default: defaultImagePath,



    },

    address: {
        type: String,
        required: [true, 'User address is required'],
    },

    phone: {
        type: String,
        required: [true, 'User phone is required'],
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    isBanned: {
        type: Boolean,
        default: false,
    },

},{timestamps:true});

const User = model('Users',userSchema);
module.exports = User;