const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGO_DB 

const initializeDatabase = async () => {
    try{
        const connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })

        if(connection){
            console.log('Connection Successful\n-------------------------\n')
        }
    }
    catch(error){
        console.log('Connection Failed')
    }
}

module.exports = initializeDatabase