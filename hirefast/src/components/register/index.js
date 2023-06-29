import React, { useState, useEffect, useRef } from "react";
import Footer from "../footer";
import Header from "../header";

export default function Register() {
  const [owner, setRole] = useState(true);
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [descLen, setDescLen] = useState(0);
  const [passLen, setPassLen] = useState(0);
  const [flags, setFlags] = useState([]);

  const getFlags = async () => {
    try {
      const data = await fetch(
        "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json"
      );
      const res = await data.json();
      res.forEach((element) => {
        setFlags((flags) => [...flags,element.name]);
      });
    } catch (err) {
    }
  };

  useEffect(() => {
    getFlags();
  }, []);

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const country = useRef();
  const desc = useRef();
  const number = useRef();
  const address = useRef();
  const remote = useRef();
  const terms = useRef();
  const resume = useRef();
  const dp = useRef();

  async function helper(e) {
    e.preventDefault();
    try {
      setLoading((loading) => true);
      setMsg();
      const formData = new FormData();
      formData.append('name',name.current?.value);
      formData.append('email',email.current?.value);
      formData.append('password',password.current?.value);
      formData.append('remote',remote.current.checked);
      formData.append('desc',desc.current?.value);
      formData.append('number',number.current?.value);
      formData.append('address',address.current?.value);
      formData.append('country',country.current?.value);
      formData.append('terms',terms.current.checked);
      formData.append("profile",dp.current?.files[0]);
      formData.append("resume",resume.current?.files[0]?resume.current?.files[0]:false);
      
      const req = await fetch(`http://localhost:1000/${owner?`owner`:`seeker`}/register`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:1000",
        },
        body: formData
      });
      const data = await req.json();
     
      if (data.success) {
        setMsg({ success: true, msg: "Registered Successfully." });
        const redirect = ()=>window.location.href='/email';   
        setTimeout(redirect,2000);
      } else{
        setMsg({ success: false, msg: data?.msg?data.msg:["Fill all data properly."] });
      }
    } catch (err) {
      setMsg({ success: false, msg: ["Connect to internet"] });
    } finally {
      setLoading((loading) => false);
    }
  }
  return (
    <div className="flex min-h-screen max-w-[100vw] overflow-x-hidden gap-10 h-full flex-col justify-between">
      <Header />
      <main className="w-full flex h-full justify-center items-center p-4 md:p-6">
        <form
          method="post"
          id="form"
          className="bg-white border-t-4 border-rose-500 rounded-xl gap-2 font-sans shadow-2xl h-full flex flex-col w-full md:w-2/3 lg:w-1/2 p-2 md:p-6 text-lg md:text-xl justify-center items-center"
        >
          <h1 className="border-2 p-2 text-lg md:text-2xl lg:text-3xl rounded-lg">
            Register @<span className="font-mono font-bold">HireFast</span>
          </h1>
          <h2 className="text-base md:text-xl lg:text-2xl font-serif font-bold">
            All * marked fields are mandatory to be filled.
          </h2>
          <span className="flex justify-center w-full gap-5 items-center">
            <label htmlFor="role">You are *</label>
            <select
              id="role"
              name="role"
              onChange={(e) => {
                e.target.value === "owner" ? setRole(true) : setRole(false);
              }}
              className="border-2 bg-slate-100"
            >
              <option value="owner">Hiring Partner</option>
              <option value="seeker">Job Seeker</option>
            </select>
          </span>
          <div className="w-full text-left">{owner? <>Name of your company *</>: <>Your name *</>}</div>
          <input
            type="text"
            className="w-full outline-none border-2 rounded-md hover:shadow hover:shadow-green-500 p-5 py-2"
            placeholder={
              owner
                ? "Name of your company *"
                : "Your name *"
            }
            ref={name}
            required
          ></input>
          <div className="w-full text-left">EMail *</div>
          <input
            type="email"
            className="w-full outline-none border-2 rounded-md hover:shadow hover:shadow-green-500 p-5 py-2"
            placeholder="EMail *"
            ref={email}
            required
          />
          <div className="w-full text-left">Password *</div>
          <div className="border-2 p-2 rounded-lg w-full hover:shadow hover:shadow-green-500 ">
            <input type="password"
              className="w-full outline-none p-5 py-2"
              ref={password}
              id="desc"
              required
              onKeyUp={(e) => setPassLen(e?.target?.value?.length)}
            />
            <label
              htmlFor="desc"
              className="text-sm font-sans flex justify-between items-center w-full"
            >
              {passLen<6 && <span className="text-red-600 font-medium">Minimum 6 words are to written.</span>}
              <span>{passLen} words</span>
            </label>
          </div>          <div className="w-full text-left">{owner?<>Description *</>:<>About *</>}</div>
          <div className="border-2 p-2 rounded-lg w-full hover:shadow hover:shadow-green-500 ">
            <textarea
              className="w-full outline-none p-5 py-2"
              placeholder={
                owner
                  ? "Description of your company in 50-100 words *"
                  : "A word about you in 50-100 words *"
              }
              ref={desc}
              id="desc"
              required
              onKeyUp={(e) => setDescLen(e?.target?.value?.length)}
            />
            <label
              htmlFor="desc"
              className="text-sm font-sans flex justify-between items-center w-full"
            >
              {descLen>100 && <span className="text-red-600 font-medium">Maximum 100 words can be written.</span>}
              {descLen<50 && <span className="text-red-600 font-medium">Minimum 50 words are to written.</span>}
              <span>{descLen} words</span>
            </label>
          </div>
          {flags?.length !== 0 && (
            <div className="w-full flex gap-5 rounded-lg px-2 py-1 border-2 md:flex-row flex-col justify-between">
              <h1 className="w-fit text-left">Country*:</h1>
              <select className="w-full overflow-x-hidden" required ref={country}>
                {flags?.map((el) => (
                  <option
                    className=""
                    value={el}
                  >
                    {el}
                  </option>
                ))}
              </select>
            </div>
          )}
          <textarea
            className="w-full outline-none border-2 rounded-md hover:shadow hover:shadow-green-500 p-5 py-2"
            placeholder="Address *"
            ref={address}
            required
          />
          {!owner && (
            <span className="w-full rounded-md flex md:flex-row flex-col justify-between items-center shadow-inner p-2 border-2">
              <label htmlFor="resume" className="">
                One page resume *:{" "}
              </label>
              <span>
              <input
                type="file"
                name="resume"
                className="w-full"
                id="resume"
                ref={resume}
                required
              />
              <p className="text-left font-light text-base">ONLY PDF(MAX 3MB)</p>
              </span>
            </span>
          )}
          <span className="w-full rounded-md flex md:flex-row flex-col justify-between items-center shadow-inner p-2 border-2">
            <label htmlFor="profile" className="">
              {owner && <span>Brand logo *</span>}
              {!owner && <span>Profile picture *</span>}:{" "}
            </label>
            <span>
              <input
                type="file"
                name="profile"
                className="w-full"
                id="profile"
                ref={dp}
                required
              />
              <p className="text-left font-light text-base">ONLY JPG, SVG AND PNG.(MAX 1MB)</p>
              </span>
          </span>
          <div className="flex flex-col gap-2">
            <span className="flex w-full bg-slate-100 shadow-inner rounded-md p-2 justify-center gap-3 items-center">
              <input
                id="remote"
                type="checkbox"
                className="h-7 w-7 outline-none accent-green-500"
                ref={remote}
                name="remote"
              />
              <label htmlFor="remote">
                {owner && <>Are you willing to offer remote job?</>}
                {!owner && <>Are you willing to accept remote job?</>}
              </label>
            </span>
            <span className="flex w-full justify-start bg-slate-100 shadow-inner rounded-md p-2 gap-3 items-center">
              <input
                id="term"
                type="checkbox"
                ref={terms}
                className="h-7 w-7 outline-none accent-green-500"
                value="tnc"
                name="tnc"
                required
              />
              <label htmlFor="terms">Accept term and conditions. *</label>
            </span>
          </div>
          {msg?.success === true && (
            <div className="relative bg-green-100 rounded-md border-2 border-green-700 font-semibold text-slate-800 px-3 py-1 font-sans">
              {msg?.msg}
              <div className="absolute bg-green-600 top-0 bottom-0 left-0 bg-opacity-50 animate-increase"></div>
            </div>
          )}
          {msg?.success === false && (
            msg?.msg?.map(el=>
              <div className=" bg-red-100 rounded-md border-2 border-red-700 font-semibold w-full text-center flex justify-center items-center text-red-600 px-3 py-1 font-sans">
                {el}
              </div> 
            )
          )}

          {!msg?.success && !loading && (
            <input
              onClick={helper}
              type="submit"
              value="Register"
              className="h-fit rounded-xl bg-cyan-400 text-white hover:scale-110 cursor-pointer border-2 py-2 p-5"
            />
          )}
          {!msg?.success && loading && (
            <div>
              <img src="/assets/images/loader-icon.svg" alt="loader" className="animate-spin h-10 w-10" />
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}
