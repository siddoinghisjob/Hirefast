import React,{useState ,useRef, useEffect} from "react";
import Footer from "../footer";
import Header from "../header";
import { GiHamburgerMenu } from "react-icons/gi";
import CenterMenu from "./centermenu";
import SideBar from "./leftside";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function JobDashboard() {
  const [homes, setHomes] = useState(false);
  useEffect(()=>{
    window.addEventListener('resize',()=>{
      setHomes(false);
    })
  })
  const Ref = useRef(null);

  return (
    <div className="body min-h-screen h-screen flex flex-col justify-between">
      <div>
        <div className="w-full overflow-hidden"><Header /></div>
        <div ref={Ref} className="bg-black text-white p-2 md:flex grid grid-cols-twice md:justify-center justify-between items-center">
          <div className="md:hidden min-w-[2.3rem]">
            {!homes&&<GiHamburgerMenu className="h-6 w-6 text-white" onClick={()=>setHomes(true)}/>}
            {homes&&<AiOutlineCloseCircle className="h-7 w-9 text-white" onClick={()=>setHomes(false)}/>}
          </div>
          <div className="relative text-2xl flex items-center justify-center w-full">
            Job title
          </div>
        </div>
      </div>
      <div className="md:grid w-full flex flex-row relative md:grid-cols-three md:justify-between items-center text-white h-full">
        <div ref={Ref} className="h-full md:w-full">
            <SideBar propsRef={Ref} homes={(window.screen.width>780)?true:homes}/>
        </div>
        <div className="h-full w-full">
            <CenterMenu props={homes}/>
        </div>
      </div>
      <Footer />
    </div>
  );
}