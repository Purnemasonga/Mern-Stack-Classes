
import React, { Component } from "react";

class RegisterForm extends Component{
    render(){
   return(
         <form action="">
            <fieldset>
                <h1>Register Form</h1>
                <label htmlFor="">Name :</label>
                <input type="text" placeholder="Enetr your Name" id=""/> <br></br>
                <label htmlFor="">Password :</label>
                <input type="text" placeholder="Enetr your Password" id=""/> <br></br>
                <label htmlFor="">Email :</label>
                <input type="text" placeholder="Enetr your Email" id=""/> <br></br>
            </fieldset>
        </form>
       
   )
    
    }
}
export default RegisterForm;

