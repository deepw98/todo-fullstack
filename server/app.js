const express = require('express');
const app = express();
const tasks = require('./src/routes/tasks');
const connectDB = require('./src/db/connect');
const NotFound = require('./src/middleware/not-found');
const users = require('./src/routes/userRoute');
const login = require('./src/routes/authRoute');
const authentication=require('./src/middleware/authentication');
const errorHandler = require('./src/middleware/error-handler');
require('dotenv').config();
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/',(req,res)=>{
    res.send('Hello world form res');
})

app.use('/api/v1/tasks',authentication, tasks);
app.use('/api/v1/users',users);
app.use('/api/v1/auth',login);
app.use(NotFound);
app.use(errorHandler);



const port = 3000;

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server is listening on port:${port}...`);
})
    } catch (error) {
        console.log(error);
    }
}

start();