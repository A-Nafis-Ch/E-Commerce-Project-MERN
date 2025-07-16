const mongoose = require('mongoose')
const { mongodbURL } = require('../secret')
const connectDatabase = async(options={}) => {
    try {
        
        await mongoose.connect(mongodbURL, options);
        console.log('connection to DB is successful.');

        mongoose.connection.on('error', (error)=>{
            console.log('DB connection error: ', error);
        })
    } catch (error) {
        console.log('Could not connect to DB', error.toString());
    }
}

module.exports = connectDatabase;