
import { useState } from "react"; 
const DisplayMyDetails=(props)=>{

console.log(props);
return (
    <>
    <h1> Student Details</h1>
    <h4>{props.CollegeName}, {props.Name},{props.Course}, {props.Role}, {props.Rollno}</h4>
    </>
);

};

export default DisplayMyDetails;
