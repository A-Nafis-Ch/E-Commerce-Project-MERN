const User = require('../models/userModel')

const findUserById = async (id) => {

    try {

        const options = { password: 0 };

        const user = await User.findById(id, options);


        if (!user) {
            throw createError('404', 'user does not exists with this id');
        };

        return user;

    } catch (error) {

        if (error instanceof mongoose.Error) {
            next(createError(400, 'Invalid User Id'));
            

        }

        throw error;

    }

}

module.exports = {findUserById};