import React from "react";

export default function CircularBar(props) {
  return (
    <div className="flex w-full min-h-[12rem] bg-slate-100 p-2 rounded-xl shadow-inner flex-col justify-center items-center">
      <span className="flex rounded-full p-3 justify-center items-center hover:scale-105 transition-all bg-green-700 shadow-inner">
        <p className="flex  preventCopy text-lime-400 font-extrabold font-mono text-2xl p-5 h-[4.5rem] w-[4.5rem] shadowNew justify-center rounded-full items-center bg-slate-900">
          {props.number}
        </p>
      </span>
      <p className="font-sans p-2 max-h-11 min-h-[2.75rem]">{props.title}</p>
    </div>
  );
}
