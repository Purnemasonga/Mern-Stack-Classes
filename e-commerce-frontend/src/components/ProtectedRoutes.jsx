//if the condition is not matched...then it should be returning directly to the children

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({children, authenticated}) => {
    const navigate =useNavigate();
if(!authenticated){
    navigate("/login");
}
  return children;
}

export default ProtectedRoutes;