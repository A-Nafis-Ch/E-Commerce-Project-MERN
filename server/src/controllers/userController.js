const createError = require('http-errors')


const getUsers = (req, res, next) => {

    try {

        // console.log(req.user.id);
        res.status(200).send({
            message: 'user profiles are returned',
            
        });

    } catch (error) {

        next(error);

    }
};

module.exports = { getUsers };