//const Nav=()=>{ -- Arrow Function //
//function Nav(){ -- Function calling//
//const Nav=function(){ -- Functional Expression//

const Nav=function(){
    return (
        <nav style={{backgroundColor: "lightgrey", height:"90px", borderRadius:"20px"}}>
            <ol style={ListStylings.orderList}>
                <li style={ListStylings.list}>Home</li>
                <li style={ListStylings.list}>Login</li>
                <li style={ListStylings.list}>Register</li>
                <li style={ListStylings.list}>About</li>
            </ol>
        </nav>
    )
}

//styling the list iteams
const ListStylings={
    list:{
        backgroundColor:"gold",
        padding: "10px 20px",
        fontSize:"22px",
        fontStyle:"itali",
        fontWeight:"bold",
    },
    orderList: {
        display:"flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "80px", 
        ListStylings: "none",                 
    },
}
export default Nav;