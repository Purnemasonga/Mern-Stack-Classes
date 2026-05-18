// importing the express and then storing it in an variable
const express = require("express")
//the packages which we are calling must be saved in an variable
const app = express();
//to start the server - 2 parameters: port, 

const env=require("dotenv")
const connection = require("./config/database")
const UserRouter=require("./routes/userRouter");
const prompt=require("./routes/promptRouter")
const cors=require("cors");
app.use(cors())



env.config(); //
connection()
app.use(express.json());

app.use("/user",UserRouter);
app.use("/ai",prompt)
const PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log("server is running on: ", PORT);
});
