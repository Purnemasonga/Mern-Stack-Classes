
//since both the addCollege,getAllColleges are in the same file so need to pass them together
  
const {
  addCollege,
  getAllColleges, deleteCollege, getCollegeBasedOnId, updateCollege,updateEmail
} = require("../controller/collegeController");

const express = require("express");
const router = express.Router();

//update : put and patch 
//put: entire collection will be updated
//patch: will update the individual email only

router.post("/add-college", addCollege);
router.get("/get-college", getAllColleges);
router.delete("/delete-college/:id", deleteCollege)
router.get("/get-college/:id", getCollegeBasedOnId)
router.put("/update-college/:id", updateCollege)
router.patch("/update-email/:email", updateEmail)


module.exports = router;
