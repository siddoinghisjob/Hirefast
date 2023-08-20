import React, { useState, useContext, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import ProfileBox from "./profile_box";
import { Context } from "../../../../context";

export default function SeekerProfile() {
  const [user, setUser] = useState();
  const context = useContext(Context);
  useEffect(() => {
    setUser((user) => context?.state);
  }, []);

  const [desc, setDesc] = useState(context?.state?.info);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [descLoading, setDescLoading] = useState();

  const handlePopup = () => {
    setVisible(!visible);
    setLoading(!loading);
  };
  const handleSubmit = async () => {
    try {
      setDescLoading(true);
      const res = await fetch(process.env.REACT_APP_ORIGIN+"/seeker/profile", {
        body: JSON.stringify({ desc: desc }),
        method: "put",
        mode: "cors",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setError(!data.success);
    } catch (err) {
      setError(true);
    } finally {
      setDescLoading(false);
    }
  };

  const helper = (e) => {
    const newValue = e.target.value;
    setDesc(newValue);
  };
  return (
    <div className="w-full h-full min-h-screen justify-between font-[Arial,sans-serif] overflow-hidden overflow-y-auto scroll gap-5 flex flex-col p-3 lg:p-7 bg-white">
      <div className="p-5 w-full relative text-base h-full rounded-xl flex justify-start items-center flex-col gap-5">
        <div className="w-full font-semibold h-fit text-center justify-center flex items-center text-5xl">
          Profile
        </div>
        <ProfileBox value={user?.name} attribute={"name"} isDisabled={true} />
        <ProfileBox value={user?.email} attribute={"email"} isDisabled={true} />
        <div className="w-full flex justify-center gap-5 items-center flex-col md:flex-row">
          <label
            className="w-full md:w-fit capitalize flex md:items-start"
            for={`"desc"`}
          >
            description
          </label>
          <input
            onChange={helper}
            value={desc}
            className={`w-full min-h-fit p-4 py-2 rounded-lg border-2 border-slate-600 placeholder:text-black`}
            id="name"
          />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 w-8/12">
          <div
            onClick={handlePopup}
            className={`"shadow-xl border-2 cursor-pointer hover:shadow-pink-400 rounded-xl px-4 py-2 bg-white ${
              user?.resume ? "text-slate-500" : "text-slate-800"
            }"`}
          >
            Resume
          </div>
        </div>
        {visible && (
          <div className="w-full absolute h-full bg-white rounded-lg shadow-2xl left-0 p-5 right-0 top-0 bottom-0">
            <div
              onClick={handlePopup}
              className="absolute z-50 cursor-pointer right-0 top-0"
            >
              <AiFillCloseCircle className="h-10 w-10 text-red-500 hover:shadow-pink-400 shadow-2xl bg-white rounded-full p-0 m-0" />
            </div>
            {loading && (
              <div className="w-full transition-all h-full flex items-center justify-center">
                <img
                  src="\assets\images\loading-gif.gif"
                  className="h-20 w-20"
                  alt="loading"
                />
              </div>
            )}
            <object
              data={`"${user?.resume}"`}
              type="application/pdf"
              width={"100%"}
              height={"100%"}
              onLoad={() => setLoading(false)}
            >
              <p>
                Your web browser doesn't have a PDF plugin. Instead, you can{" "}
                <a href={user?.resume}>click here to download the pdf</a>.
              </p>
            </object>
          </div>
        )}
      </div>
      <div className="w-full text-xl flex p-5 flex-col justify-center items-center h-fit">
        <button
          disabled={descLoading}
          className={`w-fit h-fit uppercase bg-cyan-400 text-white font-bold shadow-xl hover:shadow-cyan-500 rounded-xl px-5 py-2`}
          onClick={handleSubmit}
        >
          Save
        </button>
        <div>
          {error ? "Error. Try again." : ""}
        </div>
      </div>
    </div>
  );
}
