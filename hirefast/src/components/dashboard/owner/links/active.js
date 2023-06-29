import React from "react";
import { useNavigate } from "react-router-dom";

export default function Active(props) {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(props.link)} className="grid md:grid-cols-links grid-cols-links-rev w-full items-center">
        <div className="flex md:hidden hover:text-white justify-start pl-5 h-10 items-center cursor-pointer">
          {props.name}
        </div>
        <div className="flex md:hidden justify-end w-full">
           <div className="bg-white w-1 flex justify-end rounded-md border-white h-10"></div>
        </div>
        <div className="md:flex hidden justify-start w-full">
           <div className="bg-white w-1 flex justify-start rounded-md border-white h-10"></div>
        </div>        <div className="md:flex hidden hover:text-white justify-end pr-5 h-10 items-center cursor-pointer">
          {props.name}
        </div>
    </div>
  );
}
