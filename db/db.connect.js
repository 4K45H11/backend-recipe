const mongoose = require('mongoose');
require('dotenv').config()

const mongoUrl = process.env.MONGODB

const initializeDatabase = async()=>{
    try{
        const success = await mongoose.connect(mongoUrl);
        if(success){
            console.log('connected to database...')
        }
    }
    catch(error){
        throw error;
    }
}

module.exports = {initializeDatabase}