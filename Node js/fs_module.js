//for importing we will be calling require.
const import filename from './model';
//writefile :  create file and write data inside it.
//data will be over-writing in the file.


// fs.writeFile("sample.txt", " 2nd time data insertion - This is sample file creating by node",
//     ()=>{
//         console.log("File created successfully");
//     }
// );

// append file : by  updating the file - the new data will be added with the previous data.
//write file : here while updating the entire dta will be wiped off and then updated data will be printed.
// \n : will be used for printing in the next line.
fs.appendFile("sample.txt", " \n 1stnd time data insertion - This is sample file creating by node",
    ()=>{
        console.log(" Data appended successfully");
    },
);

// create file and write data after 2sec
setTimeout(()=>{
    fs.writeFile("sample text", "second time data insertion", ()=>{
        console.log("*************File created successfully after 2sec*****************");
    });
})
//utf-8
// error will be displayed
settimeout(()=>{
    fs.appendFile("sample.txt", 
    )
})
fs.readFile("sample.txt", "utf-8", (err, data)=>{
    if(err) {
        console.errpr(err);
    }
    console.log(data);
})

//deleting the fs file

fs.unlink("sample.txt", ()=>{
    if(err)
    console.log(err);
else
    console.log("Deleted successfully");
});

