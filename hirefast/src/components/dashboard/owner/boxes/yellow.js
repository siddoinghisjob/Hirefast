import React, { useRef } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Yellow(props) {
  const isDel = !props.hasOwnProperty("delBool");
  const refMain = useRef();
  const helper = () => {
    fetch(process.env.REACT_APP_ORIGIN+"owner/job/list", {
      method: "delete",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.id }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          refMain.current.classList = "hidden";
          props.setMsg(
            <div className="absolute left-10 md:left-[42%] md:bottom-[80%] bottom-0 z-20 bg-opacity-40 backdrop-blur-sm bg-green-50 rounded-lg flex text-[130%] justify-center items-center gap-2 px-2 font-serif border-2 border-green-600 text-green-600">
              Deleted{" "}
              <span
                className="border-l-2 font-sans border-green-600 pl-1 cursor-pointer"
                onClick={(e) => {
                  const current = e.target.parentNode;
                  current.classList.add("animate-opacity");
                  setTimeout(() => {
                    current.classList = "hidden";
                    props.setMsg("");
                  }, 950);
                }}
              >
                X
              </span>
            </div>
          );
        } else
          props.setMsg(
            <div className="absolute left-10 md:left-[42%] md:bottom-[80%] bottom-0 z-20 bg-opacity-40 backdrop-blur-sm bg-red-50 rounded-lg flex text-[130%] justify-center items-center gap-2 px-2 font-serif border-2 border-red-600 text-red-600">
              Could not delete{" "}
              <span
                className="border-l-2 font-sans border-red-600 pl-1 cursor-pointer"
                onClick={(e) => {
                  const current = e.target.parentNode;
                  current.classList.add("animate-opacity");
                  setTimeout(() => {
                    current.classList = "hidden";
                  }, 950);
                }}
              >
                X
              </span>
            </div>
          );
      })
      .catch((err) =>
        props.setMsg(
          <div className="absolute left-10 md:left-[42%] md:bottom-[80%] bottom-0 z-20 bg-opacity-40 backdrop-blur-sm bg-red-50 rounded-lg flex text-[130%] justify-center items-center gap-2 px-2 font-serif border-2 border-red-600 text-red-600">
            Could not delete{" "}
            <span
              className="border-l-2 font-sans border-red-600 pl-1 cursor-pointer"
              onClick={(e) => {
                const current = e.target.parentNode;
                current.classList.add("animate-opacity");
                setTimeout(() => {
                  current.classList = "hidden";
                }, 950);
              }}
            >
              X
            </span>
          </div>
        )
      );
  };
  return (
    <>
      <div
        ref={refMain}
        className="lg:max-w-[31.5%] max-w-full md:min-w-[50%] md:max-w-[50%] min-w-full lg:min-w-[31.5%] p-3 flex-col overflow-y-auto flex justify-center items-center text-lg font-sans h-44 text-white font-bold bg-color-3 shadow-square shadow-gray-300 rounded-lg"
      >
        <div className="flex h-full justify-between items-center px-2 w-full">
          <div className="bg-[#f7f37b] text-yellow-800 text-[80%] h-fit w-fit font-bold p-2 rounded-md">
            Active
          </div>
          {isDel && <div
            onClick={helper}
            className="bg-white cursor-pointer hover:scale-125 transition-all bg-opacity-20 p-1 rounded"
          >
            <AiTwotoneDelete className="h-9 w-8" />
          </div>}
        </div>
        <div className="w-full h-full flex flex-col gap-2 capitalize text-white font-bold">
          <Link to={`/${isDel ? "owner" : "seeker"}/job/${props.id}`}>
            <div className="cursor-pointer ">{props.title}</div>
          </Link>
          <div className="flex justify-between w-full items-center h-full">
            <div className="text-gray-50 p-1 font-thin text-left px-2 w-full ">
              #{props.id}
            </div>
            {props.notifications && (
              <div className="text-yellow-500 bg-yellow-100 p-2 h-5 w-5 flex justify-center items-center rounded-full shadowNeu">
                3
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
