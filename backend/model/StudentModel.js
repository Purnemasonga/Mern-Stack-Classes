const mongoose = require("mongoose");

// object ccreation - Schema is the non-static so need to call with the constructor.
const studentSchema=new mongoose.Schema({
    name:{type:String},
    rollNo:{type:String, unique: true, require:true},
    branch:{type:String, required:true},
    phone:{type:Number, unique:true, required:true, length:10},
    email:{type:String, unique:true, required:true},
    address:{type:String, required:true}

})
//creation of collection = model -- used to store data 
const studentModel=mongoose.model("students", studentSchema)
module.exports=studentModel;

