const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes')
const errorHandler = require('./middeware/errorHandler');


// mongoose connection
mongoose.connect("mongodb://localhost:27017/Auth", {useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// Cross origin 
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use("/", todoRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);



//Listen
app.listen(3000, ()=>{
    console.log(`Server started at port ${3000}`)
});