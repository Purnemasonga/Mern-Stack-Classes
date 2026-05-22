import { Component } from "react";

//Component = paprent Class, Super Class//
// Counter = Child class//
//constructor = Initialize an object's state and bind methods.

export class Counter extends Component{

    constructor(){
        super();
        //Sate are used to hold the data ---- this keyword is used to extract the data present inside the state
        this.state={
            count:0
        }
    }
    //this.state = heigher order function
    render(){
        return(
            <>
            <h1>Count : {this.state.count}</h1>
            <button onClick={()=>{
                this.setState((pre)=>{
                    return{ count: pre.count +1};
                });
            }}>Increment++</button>
            <button onClick={()=>{
                this.setState(()=>{
                    return{ count:0};
                });
            }}>Reset</button>
            <button onClick={()=>{
                this.setState((pre)=>{ //setState is used to update the this.state
                    return{ count: pre.count -1};
                });
            }}>Decrement--</button>
            </>
        )
    }
}

//export default Counter;


