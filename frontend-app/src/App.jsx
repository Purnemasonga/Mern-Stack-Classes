import React from "react";
//import CounterFBCSate from "./components/CounterFBCState";
//import Nav from "./components/Nav-1";
import DisplayMyDetails from "./components/DisplayMyDetails";
import Products from "./components/Products";
//import Counter from "./componets/Counter"
//import { Counter }from "./components/Counter" // { Counter } -- braces are used as we are expoerting it during the class initialization only

 
const App=()=>{

  //let Details=["Sofia", "Wo2026"];
  //let Role="Developer";
  let CollegeName="College Name :BITS VIZAG";
  let Course="Course Name :AWS";
  let Name="Student Name :Bixbi";
  let Role="Role :All-Rounder";
  let Rollno="Roll.no : WU2026";
  return(
    //attribute name: fullDetails -- can give anything//
    <p>
      {/* <Nav/>
      <Counter/> */}
      <DisplayMyDetails CollegeName={CollegeName} Course={Course} Name={Name} Role={Role} Rollno={Rollno}/> 
    </p>
  );
}
export default App;

