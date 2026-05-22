const http=require('http')
const port=5000;
const userDetails={
    name:"Bixbi",
    email: "bixbi@gmail.com",
    password: "samsung@123"
};

//Server Creation --1
const server=http.createServer((req,res)=>{
    res.end(JSON .stringify(userDetails))
});


const options={
    hostname: "localhost",
    port: 5000,
    path: "/upload",
    method: "POST",
    headers: {
        "Content-type: 
    }
}

const req=http.request("http://localhost:5000/getusers",(res)=>{
    console.log("User Response");
    res.on("end", ()=>{
        console.log("get users");
    })
})
req.end(); //for the request to be called we should call this, if not console.log (user res.... will not be executed)

server.listen(port,()=>{
    console.log("Server is running on port: ", port);
});