// add college
// get all colleges
//get college based on id
//delete college
//update collegeDeails
//update only college mail - individual mail

const collegeModel = require("../model/CollegeModel");
const Colleges=require("../model/CollegeModel");

const addCollege=async(req, res)=>{
    try{
        const{name, collegeCode, collegeAddress, departments, email, url}=req.body;
        const newCollege={
            name:name,
            collegeCode: collegeCode,
            collegeAddress: collegeAddress,
            departments: departments,
            email: email,
            url: url
        }

        await Colleges.insertOne(newCollege);
        res.status(200).json({message: "new college record added successfully 🤦‍♀️"})
    } catch (error) {
        res.status(400).json({message: "Failed to add college record 😊"})
    }
}

const getAllColleges = async (req, res) => {
    try {
        const collegeDetails = await Colleges.find(); 
        

        //condition to send resonse with foundCollege empty 
        if(!founColleges){
            res.status(404).json({message: "colleges not found"});
        }

        // Fetch from MongoDB -- global successful response 
        res.status(200).json(collegeDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
};

// deleting the college : 
// Colleges.deleteOne({_id:req.params.id})
//params -- means id as we are deleting based on the id.
const deleteCollege = async(req,res)=>{
    try{
        const deleteDocument = await Colleges.findByIdAndDelete(req.params.id);
        console.log(deleteDocument);

        res.status(200).json({message : "Deleted based on the ID"});
    } catch (error){
        res.status(500).json({message: "failed to delete the document"});
    }
};

//get college based on id
const getCollegeBasedOnId=async(req,res)=>{
    try{
        const foundCollege=await Colleges.findById(req.params.id);
        res.status(200).json({foundCollege});
    } catch (error){
        res.status(500).json({message: "failed to get college id"});
    }
};

// update 
const updateCollege= async(req,res)=>{
    // try {
        const updateCollege= await Colleges.findByIdAndUpdate(
            req.params.id,
            updateCollegeDetails,
            {new: true})
        res.status(200).json({message: "College was updated successfully"})
    // }  catch (error) {
        res.status(500).json({message:"failed to update college details"})
    // }
} 


//update email
const updateEmail = async(req,res)=>{
    try{ 
        const updatedEmail=await Colleges.findOneAndUpdate(
            {
            email: req.params.email,
             },
             {email:req.body.email},
             {new:true}
            );
    res.status(200).json({message: "email updated successfully"})
    } catch (error){
        res.status(500).json({message:"failed to update email !!"})    
    }
}
    
// exporting more than 1 function means need to pass like this
module.exports={addCollege, getAllColleges, deleteCollege, getCollegeBasedOnId, updateCollege, updateEmail };
