const mongoose = require('mongoose');
require('dotenv').config;
mongoose.connect('mongodb://'+process.env.DB_SERVICE_HOST+':27017/todoApp', 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to database");
}).catch(error => {
    console.log("unable to connect to database",error);
})
