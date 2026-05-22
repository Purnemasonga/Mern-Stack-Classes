// db.js should be conigured inside the mongoose.
// connect method is used to connect the mongoose, the mongoose is present within the connect. 
const mongoose = require ("mongoose");

// mongoose.connect("mongodb://localhost:27017/") -- we must be calling the function in teh server.js...so a particular function must eb created and then called it in teh server.js

// async and await --- 

const connection=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/bits");
        console.log("DB Connected successfully");
    } catch (error) {
        console.log("failed to connect DB");
    }
};

module.exports=connection;
