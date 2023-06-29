import React from "react";
import { Link } from "react-router-dom";

export default function Red(props) {
  return (
    <div className="md:max-w-[31.5%] max-w-full min-w-full md:min-w-[31.5%] p-3 flex-col overflow-y-auto flex justify-center cursor-pointer items-center text-lg font-sans h-44 text-white font-bold bg-color-1 shadow-square shadow-gray-300 rounded-lg">
      <div className="flex h-full justify-between items-center px-2 w-full">
        <div className="bg-[#f77b7b] text-red-800 text-[80%] h-fit w-fit font-bold p-2 rounded-md">
          Closed
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-2 capitalize text-white font-bold">
        <Link to={"/owner/job/" + props.id}>
          <div className="cursor-pointer ">{props.title}</div>
        </Link>
        <div className="text-gray-200 p-1 font-thin text-left px-2 w-full ">
          #{props.id}
        </div>
      </div>
    </div>
  );
}
