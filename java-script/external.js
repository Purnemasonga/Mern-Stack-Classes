
// console.log("This is external JS file");
// /* to directly display on the web page we should be using the document (Obj) and need to call the write function --- present only in the browser and if this was given to the node.js it will not work */
// document.write("Found you!!")

num= 'javascript ${10+20}'
num=50;
console.log(num);

num=true

class SampleExample{
    display(){
        console.log("This is non-static display method in sampleExample");
    }
    test(){
        console.log("test method");
    }
}
//reference variable = s1//
s1=new SampleExample()
s1.display()
s1.test()


function addition(){
    console.log(10+20);
}

addition()


num=456;
result=num%2==0? "Even Number" : "Odd Number"
console.log(result);

a=10;
b='10';
c=null;
d=Symbol(10);
e=1248509452n
let f;

console.log("Type of variable a is:", typeof a);
console.log("Type of variable b is:", typeof b);
console.log("Type of variable c is:", typeof c);
console.log("Type of variable d is:", typeof d);
console.log("Type of variable e is:", typeof e);
console.log("Type of variable f is:", typeof f);



let a=30;
let a=20;







