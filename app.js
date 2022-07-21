const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const commentRoutes = require('./routes/commentRoutes');
const errorHandler = require('./middeware/errorHandler');
const proflleRoutes = require('./routes/profileRoutes');
const likeRoutes = require('./routes/profileRoutes');

// mongoose connection
mongoose.connect(process.env.twitter_DB , {useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// Cross origin 
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use("/", tweetRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);
app.use('/profile', proflleRoutes);
app.use('/likes', likeRoutes)
app.use(errorHandler);



//Listen
app.listen(PORT , ()=>{
    console.log(`Server started at port ${PORT}`)
});