import React, { useRef, useEffect, useState, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Red from "./boxes/red";
import Yellow from "./boxes/yellow";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Context } from "../../../context";

export default function Center() {

  const [msg,setMsg] = useState(false);
  const [data,setData] = useState();
  const [user,setUser] = useState();
  const [loader,setLoader] = useState(false);
  const [search,setSearch] = useState("");
  const [handler,setHandler] = useState(true);
  const context = useContext(Context);

  useEffect(()=>{
    setLoader(true)
    setUser(user=>context.state);
    
    fetch(process.env.REACT_APP_ORIGIN+"owner/job/search?search="+search, {
          method: "GET",
          mode: "cors",
          credentials:'include',
          headers: {
            "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
            "Content-Type": "application/json",
          }
        })
          .then((res) => res.json())
          .then(res=>{
            if(res.success === true){
              setData({success:true});
              const arr = [];
                res.rows.map((el, index) => (
                  el.status?arr.push(
                    <Yellow
                    setMsg={setMsg}
                    key={index}
                    id={el.id}
                    title={el.jobtitle}
                  />
                  ):arr.push(<Red
                    key={index}
                    id={el.id}
                    title={el.jobtitle}
                  />)
                ));
                setData((data) => arr);
            }
          })
          .catch(err=>{setData("")})
          .finally(()=>{
            setLoader(false);
            setHandler(false);
          })
  },[search])

  const [first, firstInView, firstEntry] = useInView({
    threshold: 0,
  });
  const [second, secondInView, secondEntry] = useInView({
    threshold: 0,
  });
  const ref = useRef();
  const scrollTo = (p) => {
    let width = ref.current.clientWidth;
    if (p > 0) ref.current.scrollLeft += width*0.95;
    else ref.current.scrollLeft -= width;
  };
  return (
    <div className="w-full h-full font-[Arial,sans-serif] overflow-hidden overflow-y-auto scroll gap-5 flex flex-col p-3 lg:p-7 lg:rounded-l-[3rem] bg-white">
      {msg}
      {(loader && handler) && 
      <div className="absolute flex justify-center w-full h-full items-center z-50 left-0 top-0 bottom-0 right-0 bg-black bg-opacity-50">
        <img src="/assets/images/loading-gif.gif" alt="loading" className="h-16 w-16"/>
      </div>
      }
      <div className="text-black flex items-center gap-0">
        <div className="flex justify-center items-center rounded-md h-14 w-14 text-[#6b74f7] bg-[#cddafb]">
          <AiOutlineSearch className="h-9 w-9" />
        </div>
        <input
          type="search"
          onChange={(e)=> setSearch(e.target.value)}
          placeholder="Search"
          className="w-full h-14 text-xl font-sans rounded-l-none hover:outline-none focus:outline-none hover:shadow-md p-2 rounded-md bg-[#f0f3fc]"
        />
      </div>
      <div className="flex flex-col gap-5 h-full w-full items-center">
        <h1 className="w-full font-bold lg:text-2xl text-xl">Dashboard</h1>
        <div className="flex relative flex-col-reverse lg:grid lg:grid-cols-fifty pl-2 w-full items-center bg-[#eaf0fe] pr-1 rounded-xl ">
          <div className="flex h-full justify-between lg:px-7 lg:py-5 flex-col w-full">
            <div className="font-serif text-center h-full flex justify-center items-center font-bold text-[150%] md:text-[180%]">
              Welcome Back {user?.name}
            </div>
            <div className="p-3 h-full text-xl font-sans">
              Hire like you have never before. With{" "}
              <span className="font-mono">HireFast</span> you can streamline
              whole of your hiring pipeline.
            </div>
            <div className="p-4 h-full items-center justify-center flex lg:py-1 w-full text-center lg:text-left">
              <Link to="/owner/joblist">
                <button className="p-4 py-2 rounded-xl bg-[#6771fd] hover:scale-110 transition-all w-full lg:w-fit text-white text-xl uppercase">
                  List Job
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-end md:h-72 h-56">
            <img
              src="/assets/Svg/Geo%20location.svg"
              alt="Showing two girls; one looking for job other one looking for candidate"
              className="h-80 lg:top-5 md:top-[-5rem] md:w-10/12 top-[-2.5rem] absolute right-0 md:-right-28"
            />
          </div>
        </div>
      </div>
      {data?.length!==0? 
      <div className="flex mt-2 flex-col">
        <h1 className="capitalize w-full font-bold lg:text-2xl text-xl">
          previous posted jobs
        </h1>
        <div className="w-full h-full relative">
          <div
            ref={ref}
            className="w-full scroll scroll-smooth h-full overflow-x-auto justify-start items-start flex gap-2 lg:gap-4 p-5"
          >
           <p ref={first}></p>{data}<p ref={second}></p>
          </div>

          <div
            className={`lg:absolute hidden ${
              firstInView ? "" : "lg:block"
            } transition-all static left-[-1rem] z-50 cursor-pointer rounded-lg p-2 bg-white bg-opacity-25 top-[40%]`}
            onClick={() => scrollTo(-1)}
          >
            <BsFillArrowLeftCircleFill className="h-8 w-8" />{" "}
          </div>
          <div
            className={`lg:absolute hidden ${
              secondInView ? "" : "lg:block"
            } transition-all static right-[-1rem] z-50 cursor-pointer rounded-lg p-2 bg-white bg-opacity-25 top-[40%]`}
            onClick={() => scrollTo(1)}
          >
            <BsFillArrowRightCircleFill className="h-8 w-8" />{" "}
          </div>
        </div>
      </div>:''}
    </div>
  );
}
