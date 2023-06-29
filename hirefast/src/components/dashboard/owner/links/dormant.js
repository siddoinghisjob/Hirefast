import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dormant(props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(props.link)}
      className="grid md:grid-cols-links grid-cols-links-rev md:static w-full items-center"
    >
      <div className="flex md:hidden hover:text-white justify-start pl-5 h-10 items-center text-gray-400 cursor-pointer">
        {props.name}
      </div>
      <div className="border-0 border-white h-10"></div>
      <div className="md:flex hidden hover:text-white justify-end pr-5 h-10 items-center text-gray-400 cursor-pointer">
        {props.name}
      </div>
    </div>
  );
}
