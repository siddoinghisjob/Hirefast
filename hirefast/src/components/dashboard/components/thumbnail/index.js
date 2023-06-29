import React from "react";
import { useNavigate } from "react-router-dom";

export default function Thumbnail(props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={()=>navigate("/error404")}
      className="bg-white hover:scale-90 md:max-w-fit transition-all cursor-pointer h-full w-full flex-col items-center flex justify-center rounded-2xl md:p-5 p-2"
    >
      <div className="relative rounded-md justify-center items-center flex w-full h-full">
        <span className="text-white rounded-md rounded-b-none h-full w-full flex justify-center items-center bg-slate-800">
          <span className="p-3 text-[300%] md:text-8xl font-bold font-sans">Hire</span>
        </span>
        {props.notifications && (
          <div className="h-6 w-6 font-bold flex justify-center items-center right-[-0.5rem] top-[-0.5rem] font-mono absolute rounded-full shadowNeu p-1 bg-gray-800 text-yellow-300">
            {props.notifications}
          </div>
        )}
      </div>
      <div className="w-full h-full p-5 bg-slate-200 rounded-t-none shadow-inner rounded-md flex justify-center flex-col items-center">
        <div className="w-full font-sans">
          <span className="font-semibold">Job Heading</span>: {props.jobheading}
        </div>
        <div className="overflow-x-auto scroll w-full">{props.jobid}</div>
      </div>
    </div>
  );
}
