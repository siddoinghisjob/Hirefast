import React, { useRef, useEffect } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import Loading from "./chats/loading";
import Me from "./chats/from";
import From from "./chats/me";

export default function CenterMenu(props) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className="h-[calc(100vh-10.8rem)] z-20 w-full flex flex-col justify-between relative">
      {props.props && (
        <div className="absolute bg-black h-full w-full bg-opacity-60"></div>
      )}
      <div className="h-full w-full md:p-3">
        <div className="md:backdrop-blur-sm -z-10 h-full w-full overflow-y-auto scroll md:bg-gray-300 md:border-2 md:shadow-xl md:rounded-2xl md:bg-opacity-30">
          <div className="p-2 flex flex-col px-1">
            <Me time="10:00AM" chat="Hi bro!" />
            <From chat="Going good" />
            <From chat="And you?" time="12:1PM" />
            <Me chat="Actually I needed some help from you... I needed some money ;)" />
            <From chat="No isse" time="10AM"/>
            <Loading time="11:15AM" />
            <div ref={divRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
