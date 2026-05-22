import { useState } from "react";

const CounterFBCSate=(props)=>{

    //count= variable stores the initial values, setCount = method which is used to mutate 
    // the values present in the count
    let [count, setCount]= useState(0);

    console.log(props);
    console.log(props.fullDetails);


    return(
        <>
        <h3>Function Based Component</h3>
        <h4>Props Data : {props.Role}, {props.fullDetails}</h4>
        <h1>Count: {count}</h1>
        <button onClick={()=>{setCount(count+1)}}>Increment</button>
        <button onClick={()=>{setCount(0)}}>Reset</button>
        <button onClick={()=>{setCount(count-1)}}>Decrement</button>
        </>

    ) 

}

export default CounterFBCSate;
