import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import { Context } from "./context";
import Loader from "./components/loader";

export default function UnProtectedPath({ children }) {
  const status = useContext(Context);
  if(status.state?.success === null) return <Loader/>
  return status.state?.success ? <Navigate to={`/${status.state?.type?'owner':'seeker'}/dashboard`} replace />:children ;
}
