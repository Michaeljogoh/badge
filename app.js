const express = require('express');
const app = express();
const cors = require('cors');


// cross origin 
app.use(cors());



// PORT
const PORT = process.env.PORT
//Listen
app.listen(PORT , ()=>{
    console.log(`Server started at port ${PORT}`)
});