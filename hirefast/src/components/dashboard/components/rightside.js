import React, { useRef, useContext, useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import Calendar from "../components/calendar";
import { Context } from "../../../context";

export default function RightSide({ right }) {
  const [loading, setLoading] = useState(null);
  const setMainLoading = (boolean) => setLoading(boolean);
  const ref = useRef();
  const [user, setUser] = useState();
  const context = useContext(Context);
  useEffect(() => {
    setUser((user) => context?.state);
  }, []);
  if (right === true) {
    const menuOpener = () => {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("flex");
    };
    menuOpener();
  } else if (right === false) {
    const menuCloser = () => {
      ref.current.classList.add("exitRight");
      setTimeout(() => {
        ref.current.classList.remove("exitRight");
        ref.current.classList.remove("flex");
        ref.current.classList.add("hidden");
      }, 1200);
    };
    menuCloser();
  }
  const logoutHandler = () => {
    setMainLoading(true);
    fetch(process.env.REACT_APP_ORIGIN+"/logout", {
      method: "post",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) window.location.href = "https://hirefast-dbcb3.web.app";
      })
      .catch((err) => console.log(err))
      .finally(() => setMainLoading(false));
  };

  return (
    <div
      ref={ref}
      className={`hidden menuRight overflow-y-auto scroll md:flex md:static z-10 absolute top-0 bottom-0 bg-dashSec flex-col gap-5 w-10/12 justify-center md:w-full md:h-full md:justify-start items-start`}
    >
      <div
        className={`"w-full h-full absolute z-50 left-0 top-0 bottom-0 right-0 bg-black bg-opacity-30 flex justify-center items-center ${
          loading ? "visible scale-100" : "hidden scale-0"
        }"`}
      >
        <div>
          <img
            src="\assets\images\loading-gif.gif"
            className="h-20 w-20"
            alt="loading"
          />
        </div>
      </div>
      <div className="flex flex-col w-full justify-start h-full items-start p-3 gap-5 md:gap-6">
        <div className="bg-white shadow-md font-semibold text-lg flex flex-col justify-center items-center w-full h-fit rounded-xl p-2">
          <div className="flex justify-start font-bold text-left text-2xl border-b-2 w-full">
            Profile
          </div>
          <div className="bg-gray-50 w-full h-full shadow-inner p-2 rounded">
            <div className="w-full h-full p-2 items-center grid grid-cols-two">
              <span className="w-full h-full flex items-center">
                {!user?.dp && (
                  <FaUserAlt className="h-7 w-7 rounded-full border-2" />
                )}
                {user?.dp && (
                  <img
                    src="/assets/images/form-bg.jpg"
                    alt={user?.name}
                    className="h-7 w-7 rounded border-2"
                  />
                )}
              </span>
              <span className="w-full max-h-20 text-[100%] scroll overflow-y-auto flex justify-end md:text-center text-right">
                {user?.name}
              </span>
            </div>
          </div>
          {parseInt(user?.type) === 0 && (
            <div className="flex w-full items-center h-full p-2 justify-between">
              <span className="w-full flex justify-start md:text-center text-right text-[100%] scroll overflow-y-auto">
                {user?.email}
              </span>
            </div>
          )}
          <div className="w-full items-center h-full p-2 border-2 rounded-md bg-zinc-50 border-dashed justify-between flex">
            {user?.info}
          </div>
        </div>
        <div className="w-full">
          <Calendar />
        </div>
        <div
          onClick={logoutHandler}
          className="w-full flex items-center justify-center cursor-pointer hover:shadow-rose-600 h-fit uppercase font-bold text-slate-800 bg-white rounded-lg shadow-2xl px-5 py-2"
        >
          Logout
        </div>
      </div>
    </div>
  );
}
