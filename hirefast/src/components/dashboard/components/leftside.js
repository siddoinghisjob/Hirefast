import React, { useRef, useState ,useContext} from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context";
import Selecter from "../owner/links/selecter";

export default function Leftside({current,setRight,right}) {
  const ref = useRef();
  const navigate = useNavigate();
  const context = useContext(Context)?.state;
  const [state, setState] = useState(false);
  const menuOpener = () => {
    ref.current.classList.remove("hidden");
    ref.current.classList.add("flex");
  };
  const menuCloser = () => {
    ref.current.classList.add("exit");
    setTimeout(() => {
      ref.current.classList.remove("exit");
      ref.current.classList.remove("flex");
      ref.current.classList.add("hidden");
    }, 1200);
  };

  return (
    <div className="md:min-h-screen h-20 bg-[#141531] flex flex-col justify-between items-center md:h-full w-full text-white">
      <div className="grid md:p-10 p-3 px-3 grid-cols-thrice-rev md:grid-flow-rows w-full justify-between items-center">
        <div
          onClick={() => {
            if (!state) {
              setState(true);
              menuOpener();
            } else {
              setState(false);
              menuCloser();
            }
          }}
          className="text-white text-2xl hover:rounded-full hover:bg-white hover:bg-opacity-20 flex justify-center items-center p-2 md:hidden"
        >
          <AiOutlineMenu />
        </div>
        <div
          onClick={() => navigate("/")}
          className="font-mono cursor-pointer text-xl w-full flex justify-center items-center"
        >
          <div className="w-fit md:w-full rounded-lg p-2 md:px-6 bg-white bg-opacity-20 flex justify-center gap-1 items-center">
            <img
              src="/assets/images/fast-speed-icon.svg"
              alt="fast icon"
              className="h-10"
            />
            <span className="h-10 flex items-center">HireFast</span>
          </div>
        </div>
        {right!==false &&<div
          onClick={() => setRight(right=>!right)}
          className="text-white text-2xl hover:rounded-full hover:bg-white hover:bg-opacity-20 flex justify-center items-center p-2 md:hidden"
        >
          <AiOutlineMenu />
        </div>}
      </div>
      <div
        ref={ref}
        className={`hidden menu md:flex md:static z-10 absolute top-0 bottom-0 md:rounded-none rounded-r-xl bg-[#141531] flex-col gap-5 w-44 justify-center md:w-full md:h-full md:justify-start items-start`}
      >
        {context?.type === "0" && 
        <>
          <Selecter link={"/owner/dashboard"} current={current===0?true:false} name="HOME" />
          <Selecter link={"/owner/joblist"} current={current===1?true:false} name="POST JOB" />
          <Selecter link={"/owner/profile"} current={current===2?true:false} name="PROFILE" />
          </>}
        {context?.type === "1" && 
        <>
          <Selecter link={"/seeker/dashboard"} current={current===0?true:false} name="HOME" />
          <Selecter link={"/seeker/joblist"} current={current===1?true:false} name="SEARCH JOB" />
          <Selecter link={"/seeker/profile"} current={current===2?true:false} name="PROFILE" />
          </>}
      </div>
    </div>
  );
}
