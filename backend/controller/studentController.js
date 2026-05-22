// add student
// get all students
//get student based on id
//delete student
//update studentDeails
//update only phoneno


const Students = require("../model/StudentModel")

//add student
// req.body --- used to store the data.
// const {array object}
const addStudent=(req,res)=>{
   try{
     const{ name, rollNo, branch, phone, email, address } = req.body;

    const newStudent={
        name:name,
        rollNo:rollNo,
        branch: branch,
        phone: phone,
        email: email,
        address: address,
    };
    Students.insertOne(newStudent);
    res.status(200).json({message:"Student Added Successfully"});
   } catch (e) {
    res.status(500).json({message: "Failed to add student"})
    cosnole.log(err);
   } 
};

module.exports=addStudent;



