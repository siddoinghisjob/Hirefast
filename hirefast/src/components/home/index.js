import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";
import { Context } from "../../context";

export default function Home() {
  const context = useContext(Context);
  return (
    <div className="flex min-h-screen overflow-x-hidden gap-10 h-full flex-col justify-between">
      <main className="flex shadow-lg pt-0 flex-col justify-start items-center h-full bg-cyan-200 bg-opacity-50 rounded-2xl">
        <Header/>
        <div className="flex flex-col h-full gap-10 m-5 justify-center items-center">
          <span className="flex justify-center items-center w-full">
            <input
              type="search"
              className="w-full outline-none hover:shadow-emerald-300 p-3 font-sans py-2 rounded-full shadow-xl"
              placeholder="Search for jobs"
            />
          </span>
          <div className="flex gap-10 relative justify-center items-center">
            <p className="text-5xl font-mono font-bold flex flex-col md:flex-row text-prime">
              <ul className="flex gap-2">
                Hire
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-cyan-500">
                  fast<b className="text-prime">.</b>
                </p>
              </ul>
              <ul className="flex md:flex-row gap-2 md:gap-5 flex-col">
                <b className=" min-w-fit">Get hired</b>
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-cyan-500">
                  fast<b className="text-prime">.</b>
                </p>
              </ul>
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mb-3">
          <div className="flex p-2 md:p-0 md:text-3xl text-2xl md:flex-row flex-col justify-center gap-2 md:gap-5 w-full">
            {context?.state?.success===false && <>
              <Link to="/signup">
              <button className="text-center button font-sans font-semibold text-3xl p-3 py-1 uppercase w-full hover:scale-110 text-prime bg-gradient-to-r from-second to-tert rounded-xl">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="text-center button font-sans font-semibold text-3xl p-3 py-1 uppercase w-full hover:scale-110 text-prime bg-gradient-to-r from-second to-tert rounded-xl">
                Login
              </button>
            </Link>
            </>}
            {context?.state?.success===true &&
            <>
            <Link to={`/${context?.state?.type==='0'?'owner':'seeker'}/dashboard`}>
              <button className="text-center button font-sans font-semibold text-3xl p-3 py-1 uppercase w-full hover:scale-110 text-prime bg-gradient-to-r from-second to-tert rounded-xl">
                Dashboard
              </button>
            </Link>
            </>}
          </div>
        </div>
      </main>
      <div className="p-5 pt-3 md:p-10">
      <div className="p-0 pt-[0.4rem] rounded-xl bg-gradient-to-r from-cyan-500 via-green-300 to-cyan-500">
      <div className="w-full h-full shadow-xl p-5 bg-white rounded-md">
        <div className="text-xl flex flex-col items-center justify-between h-full">
          <h2 className="text-2xl font-bold text-center p-2 text-prime rounded-3xl font-sans w-full">
            Entire hiring pipeline streamlined for{" "}
            <span className="uppercase w-fit pb-1 text-3xl relative bg-gradient-to-r from-cyan-400 to-green-400">
              <span className="bg-white">you</span>
            </span>
          </h2>
          <h1 className="font-semibold my-6"> And why should you use us?</h1>
          <div>
            <div className="text-xl font-semibold font-mono text-center">
              For hiring partners.
            </div>
            <div className="flex justify-center pt-5 items-center w-full">
              <ul className="flex flex-col gap-5 md:grid md:grid-cols-2 font-semibold justify-between w-full">
                <li className="li">
                  <div className="font-bold text-[#7fffd4] text-9xl stroke-text text-left font-sans">
                    1
                  </div>
                  <div className="h-full flex flex-col p-5 justify-between items-center">
                    <h1>Post a JOB</h1>
                    <img src="/assets/images/we-are-hiring-icon.svg" className="h-36" alt="hiring"/>
                  </div>
                </li>
                <li className="li">
                  <div className="font-bold text-9xl stroke-text text-[#7fffd4] text-left font-sans">
                    2
                  </div>
                  <div className="h-full flex flex-col p-5 justify-between items-center">
                    <h1>Schedule a Online Interview / Test</h1> 
                    <img src="/assets/images/conference-video-call-icon.svg" className="h-36" alt="interview"/>
                  </div>
                </li>
                <li className="li">
                  <div className="font-bold text-9xl stroke-text text-[#7fffd4] text-left font-sans">
                    3
                  </div>
                  <div className="h-full flex flex-col p-5 justify-between items-center">
                    <p>
                      Interview the candidate on our our in house video call
                      app.
                    </p>
                    <img src="/assets/images/mobile-video-chat-icon.svg" className="h-28 w-20" alt="interview"/>
                  </div>
                </li>
                <li className="li">
                  <div className="font-bold text-9xl stroke-text text-[#7fffd4] text-left font-sans">
                    4
                  </div>
                  <div className="h-full flex flex-col p-5 justify-between items-center">
                    <h1>Conduct test on our platform itself.</h1>
                    <img src="/assets/images/online-poll-survey-icon.svg" className="h-32" alt="interview"/>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-center border-t-2 mt-7 border-slate-400 flex-col items-center">
            <div className="text-xl mt-2 py-5 font-semibold font-mono text-center">
              For job seekers.
            </div>
            <div className="w-full">
              <ul className="flex flex-col gap-5 md:grid md:grid-cols-3 font-semibold items-center justify-between w-full">
                <li className="li">
                  <div className="font-bold text-9xl stroke-text text-[#7fffd4] text-left font-sans">
                    1
                  </div>
                  <div className="h-full flex flex-col p-5 justify-between items-center">
                    <h1>Apply for a JOB</h1>
                    <img src="/assets/images/choose-icon.svg" className="h-32 w-fit" alt="apply to a job"/>
                  </div>
                </li>
                <li className="li">
                  <div className="font-bold text-9xl stroke-text text-[#7fffd4] text-left font-sans">
                    2
                  </div>
                  <div className="h-full flex gap-3 flex-col p-5 justify-between items-center">
                    <h1>All job postings are posted by verified companies</h1>
                    <img src="/assets/images/apply.svg" className="h-32 w-fit" alt="verified"/>
                  </div>
                </li>
                <li className="li">
                  <div className="font-bold text-9xl stroke-text text-[#7fffd4] text-left font-sans">
                    3
                  </div>
                  <div className="h-full flex flex-col p-5 justify-between items-center">
                    <h1>Wrap up your entire hiring process here.<br/> From Resume to joining letter.</h1>
                    <img src="/assets/images/job-search-icon.svg" className="h-32 w-fit" alt="verified"/>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
}
