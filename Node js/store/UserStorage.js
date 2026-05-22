
let userDetails=[];

const displayUser=()=>{
    // const UserDetail=userDetails.filter((user)=>user.email=email);
    console.log(userDetails);
};

const postUsers=(user)=>{
    userDetails.push(user);
};
// by Deleting the existing users..and the by typing the 
const deleteUser=(name)=>{
    const AfterUsers= userDetails.filter((user)=> user.name!=name);
    userDetails=AfterUsers;
    console.log("After Delete :", AfterUsers);
};

const displayUserBasedEmail = (email)=>{
    const afterEmailFilterUser = userDetails.filter(
        (user)=> user.email == email,
    );
    return afterEmailFilterUser;
};

//filter is used for checking whether the email is present or not
const updateName=(name, email)=>{ 
    const foundUser = userDetails.filter((user)=> user.email==email)
    console.log(foundUser);

};

module.exports={displayUser, postUsers, deleteUser, displayUserBasedEmail };


