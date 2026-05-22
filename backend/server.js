const express = require("express")
const app = express(); 
const PORT = 4000;
const connection=require("./config/db")
app.use(express.json());
connection();

const studentRouter=require("./routes/studentRouter");
//students = main router path...
app.use("/students",studentRouter);

const collegeRouter=require("./routes/collegeRouter");
app.use("/college", collegeRouter);

app.listen(PORT,()=>{
    console.log("Server running on port", PORT);
});

