import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "./components/loader";
import {Context} from "./context";

export default function ProtectedPath({ children, role }) {
  const status = useContext(Context);
  const location = useLocation();
  if(status.state?.success === null && !(status.state?.type )) return <Loader/>;
  if(status.state?.success){
    if(role && parseInt(status.state?.type) !== parseInt(role)) return <Navigate to="/unauthorize" replace state={{path:location.pathname}}/>;
    return children;
  }
  else{
    return <Navigate to="/login" replace state={{path:location.pathname}}/>;
  }
}