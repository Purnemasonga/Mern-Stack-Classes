const {display,test,name}=require("./model");

console.log("This is Server.js File");
display();
const testResult=test()
console.log(testResult);
console.log(name);


console.log("--------------------------------");

const {displayUser, postUsers, deleteUser, update} = require("./store/UserStorage.js");
console.log("Before post users:", displayUser());

console.log("before post users: ", displayUser());

postUsers({name: "ruby", email:"ruby@gmail.com"});
postUsers({name: "bewjewel", email:"bewjewel@gmail.com"});

console.log("after post user Details", displayUser());


deleteUser("bewjewel");

console.log("after delete Users: ", displayUser());

console.log(" ")
console.log("Email : ruby@gmail.com", displayUserBasedEmail('ruby@gmail.com'));

