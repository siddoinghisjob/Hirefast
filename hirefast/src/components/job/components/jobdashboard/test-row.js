import React, { useEffect, useState } from "react";

export default function TestRow(props) {
  const [trigger,setTrigger] = useState(false);
  const [msg,setMsg] = useState("");
  
  useEffect(()=>{
    fetch("http://localhost:1000/owner/test/select",{
      method:"POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        jobid:props.jobId,
        testid:props.testId
      })
    })
    .then(res=>res.json())
    .then(res=>setMsg(res.success?"Success":"Error"))
  },[trigger])
  return (
    <div className="h-fit w-full">
      <div
        id="test-popup"
        className="absolute flex flex-col gap-2 border-2 border-collapse scale-0 transition-all left-1 right-1 -top-28 p-3 pt-1 shadow-square rounded-md bg-zinc-100 text-slate-800"
      >
        <div className="flex justify-between w-full h-full">
        <div className="flex justify-between w-full h-full">
          <div className="w-full flex justify-around flex-wrap gap-1">
            <div className="w-full max-w-[13rem] flex justify-between items-center">Date <input type="date" className="w-full max-w-[10rem] h-10 p-2"/></div>
            <div className="w-full max-w-[13rem] flex justify-between items-center">Time <input type="time" className="w-full max-w-[10rem] h-10 p-2"/></div>
            <button onClick={()=>setTrigger(!trigger)} className="button h-10">Select</button>
          </div>
        </div>
          <div
            index={props.index}
            onClick={(e) => {
              document.querySelector("#test-popup")?.classList?.add("scale-0");
              document
                .querySelector("#test-popup")
                ?.classList?.remove("scale-100");
            }}
            className="flex justify-center text-rose-500 cursor-pointer hover:bg-rose-500 hover:text-white border-rose-500 items-center h-8 w-8 border-2 border-collapse rounded-md"
          >
            X
          </div>
        </div>
        {props.questions?.map((question) => (
          <div className="w-full pt-5 flex-col h-full max-h-72 md:max-h-96 overflow-y-auto scroll flex justify-center items-start">
            <div className="bg-white font-semibold flex flex-col justify-center items-center p-2 rounded-md w-full">
              <div className="w-full text-[110%] p-3">
                {question?.question}
              </div>
              <ul className="grid grid-flow-rows gap-3 font-medium text-slate-800 border-2 border-collapse rounded-md p-2 md:grid-cols-2 w-full h-full">
                {question?.answers?.map((el) => (
                  <li
                    className={`"w-full flex justify-center rounded-lg px-1 font-medium overflow-auto scroll border-2 ${
                      el.correct ? "bg-emerald-100 text-emerald-900 border-emerald-600" : "bg-rose-100 text-rose-900 border-rose-600"
                    } py-2 rounded-md"`}
                  >
                    {el.answer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div
        index={props.index}
        onClick={(e) => {
          document.querySelector("#test-popup")?.classList?.remove("scale-0");
          document.querySelector("#test-popup")?.classList?.add("scale-100");
        }}
        className="grid cursor-pointer grid-cols-test-select-popup w-full"
      >
        <div
          index={props.index}
          className="border-2 overflow-x-auto scroll border-b-0 text-gray-800 flex w-full justify-center items-cente p-3 border-r-0"
        >
          {props.id}
        </div>
        <div
          index={props.index}
          className="border-2 overflow-x-auto scroll border-b-0 text-gray-800 flex w-full justify-center items-center p-3 border-r-0"
        >
          {props.number}
        </div>
        <div
          index={props.index}
          className="border-2 overflow-x-auto scroll border-b-0 text-gray-800 flex w-full justify-center items-center p-3"
        >
          {props.date}
        </div>
      </div>
    </div>
  );
}
