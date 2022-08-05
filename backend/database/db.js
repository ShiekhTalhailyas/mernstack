const mongoose = require('mongoose')

const connectedDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`error message: ${error.message}`.red.underline.bold);   
        process.exit(1)
    }
}

module.exports= connectedDB