const mongoose=require("mongoose")

const collegeSchema=new mongoose.Schema({
    name:{type:String, required:true},
    collegeCode:{type:String, unique: true, required :true},
    collegeAddress:{type:String, required: true},
    departments:{type:Array},
    email:{type:String, unique: true, required:true},
    url:{type:String, required:true,unique: true}
},{timestamps:true});

const collegeModel=new mongoose.model("colleges", collegeSchema);

module.exports=collegeModel;