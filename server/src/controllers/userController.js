const createError = require('http-errors')
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');
const { findUserById } = require('../services/findUserById');


const getUsers = async (req, res, next) => {

    try {

        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp('.* ' + search + '.*', 'i');

        const filter = {

            // $ ne means not equal expression
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]


        };

        const options = { password: 0 }; //password will not be shown.


        const users = await User.find(filter, options).limit(limit).skip((page - 1) * limit);

        const count = await User.find(filter).countDocuments();
        if (!users) throw createError(404, 'no users found');

        // console.log(req.user.id);

        return successResponse(res, {
            statusCode: 200,
            message: 'user profiles are returned',
            payload: {
                users,
                pagination: {

                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,

                }
            }
        })

    } catch (error) {

        next(error);

    }
};

const getUser = async (req, res, next) => {

    try {

        const id = req.params.id;
        const user = await findUserById(id);

        


        return successResponse(res, {

            statusCode: 200,
            message: 'User returned successfully!',
            payload: { user },
        });


    } catch (error) {


        next(error);


    }
    

};


module.exports = { getUsers, getUser };