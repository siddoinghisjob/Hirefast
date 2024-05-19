import React, { useEffect, useState, useRef } from "react";
import Header from "../header";
import { Link, useLocation } from "react-router-dom";
import Footer from "../footer";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const [role, setRole] = useState("owner");
  const [msg, setMsg] = useState();
  const [submit, setSubmit] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmit(submit === null ? true : !submit);
  };

  const handlerRadio = (e) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    if (submit !== null) {
      setMsg();
      setLoading(true);
      fetch(`${process.env.REACT_APP_ORIGIN}/${role}/login`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            const func = () =>
              (window.location.href = state?.path || "/" + role + "/dashboard");
            setMsg(
              <div className="relative bg-green-100 rounded-md border-2 border-green-700 font-semibold text-slate-800 px-3 py-1 font-sans">
                Successfully logged in.
                <div className="absolute bg-green-600 top-0 bottom-0 left-0 bg-opacity-50 animate-increase"></div>
              </div>
            );
            setTimeout(func, 2000);
          } else {
            if (res?.msg) {
              setMsg(
                res?.msg?.map((message) => (
                  <div className="p-2 py-1 w-full flex justify-center items-center text-center bg-red-50 text-red-700 rounded-xl border-2 border-rose-700">
                    {message}
                  </div>
                ))
              );
            } else {
              setMsg(
                <span className="p-2 py-1 w-full bg-red-50 text-red-700 rounded-xl border-2 border-rose-700">
                  Email doesn't exist.&nbsp;
                  <Link to="/signup" className="text-cyan-800 hover:underline">
                    Sign up
                  </Link>
                </span>
              );
            }
          }
        })
        .catch((err) => {
          <div className="p-2 py-1 w-full flex justify-center items-center text-center bg-red-50 text-red-700 rounded-xl border-2 border-rose-700">
            Email or password is wrong.
          </div>;
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [submit]);
  return (
    <div className="flex min-h-screen max-w-[100vw] overflow-x-hidden gap-10 h-full flex-col justify-between">
      <Header />
      <main className="w-full flex flex-col h-full justify-center items-center p-4 md:p-6">
        <form
          method="post"
          id="form"
          className="bg-white border-t-4 border-rose-500 rounded-xl gap-7 font-sans shadow-2xl h-full flex flex-col w-full md:w-2/3 lg:w-1/2 p-2 md:p-6 text-lg md:text-xl justify-center items-center"
        >
          <h1 className="border-2 p-2 text-lg md:text-2xl lg:text-3xl rounded-lg">
            Login @<span className="font-mono font-bold">HireFast</span>
          </h1>
          <div className="flex w-full flex-col justify-center items-center border-2 rounded-2xl gap-5 p-5 backdrop-blur-md">
            <div
              id="role"
              className="flex md:flex-row flex-col w-full gap-2 items-center"
            >
              <span className="flex bg-[#f8fafc] shadow-inner p-2 rounded-lg justify-between flex-row-reverse md:flex-row gap-3 w-full items-center">
                <input
                  name="role"
                  type="radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  id="owner"
                  value="owner"
                  checked={role === "owner"}
                  onChange={handlerRadio}
                />
                <label htmlFor="owner">Hiring Partner</label>
              </span>
              <span className="flex bg-[#f8fafc] shadow-inner p-2 rounded-lg justify-between flex-row-reverse md:flex-row w-full items-center">
                <input
                  name="role"
                  type="radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  id="seeker"
                  value="seeker"
                  checked={role === "seeker"}
                  onChange={handlerRadio}
                />
                <label htmlFor="seeker">Job Seeker</label>
              </span>
            </div>

            <div className="Glogout"></div>
            <div className="w-full flex gap-2 justify-center flex-col border-2 rounded-md p-5">
              <div className="flex flex-col">
                <div>Email</div>
                <input
                  type="email"
                  ref={email}
                  className="w-full border-2 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <div>Password</div>
                <input
                  type="password"
                  ref={password}
                  className="w-full border-2 rounded-md p-2"
                />
              </div>
              <div className="w-full flex justify-center">
                {!loading && (
                  <button className="button" onClick={submitHandler}>
                    Login
                  </button>
                )}
                {loading && (
                  <div>
                    <img
                      src="/assets/images/loader-icon.svg"
                      alt="loader"
                      className="animate-spin h-10 w-10"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className=" hidden italic font-thin text-[120%]">Or</div>
          </div>
          {msg && (
            <div className="flex gap-3 flex-col justify-center items-center w-full">
              {msg}
            </div>
          )}
          <h1 className="text-gray-600 font-medium">
            Don't have an account?&nbsp;
            <Link
              to="/signup"
              className="text-cyan-800 hover:text-cyan-500 hover:underline"
            >
              Sign Up
            </Link>
          </h1>
        </form>
      </main>
      <Footer />
    </div>
  );
}
