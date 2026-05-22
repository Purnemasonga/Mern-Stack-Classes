//export the data present in this file and then need t import it in the server.js in order to obtain the data.
// let a=10;
// console.log(a);
// this function can be transfered from one file to another by using the export
function display (){
    console.log("This is the display function");
}

//test to return userDetails
const test=()=>{

    const userDetails={ 
        name:"Alpha",
        email:"alpha@gmail.com",
        phone: 9134567921
    };
    return userDetails;
};


const name="Raghu";

//in js export default fileame.
module.exports={display,test, name}