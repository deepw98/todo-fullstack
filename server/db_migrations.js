const mongoose = require('mongoose');
const connectDB = require('./src/db/connect');
const Task = require('./src/models/Task');
require('dotenv').config();

const migrateUserId =async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('connection successful.Migration started');

        const filter = {userId:{$exists:false}};
        const update = {$set:{userId:'f340'}};

        const result = await Task.updateMany(filter,update);
        console.log('migration complete.')
    } catch (error) {
        console.log('Migration failed:',error);
    }finally{
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

migrateUserId();