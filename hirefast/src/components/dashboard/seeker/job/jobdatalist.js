import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../../context";

export default function JobDataList({ title, data, id }) {
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [status, setStatus] = useState(0);
  const [user, setUser] = useState();
  const context = useContext(Context);
  useEffect(() => {
    setUser((user) => context?.state);
  }, []);
  useEffect(() => {
    const helper = async () => {
      try {
        const data = await fetch(
          "http://localhost:1000/seeker/joblist/applications/list",
          {
            method: "post",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ jid: id }),
            credentials: "include",
          }
        );
        const res = await data.json();
        setStatus(res.state);
        setMsg(res.success);
      } catch (err) {
        setStatus(0);
      } finally {
        setLoading(false);
      }
    };
    helper();
  }, []);
  const handler = () => {
    setState(!state);
    fetchCall();
  };
  const fetchCall = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        "http://localhost:1000/seeker/joblist/applications",
        {
          method: "post",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jid: id, resume: user?.resume }),
          credentials: "include",
        }
      );
      const res = await data.json();
      if(res.success) setMsg(true);
    } catch (err) {
      setMsg(false);
    } finally {
      setLoading(false);
    }
  };
  if (title === "Job Title") {
    return (
      <div className="w-full h-full text-center font-sans relative flex flex-wrap items-center justify-between font-bold text-4xl">
        <div className="">{data}</div>
        <button
          onClick={handler}
          disabled={status !== 0}
          className={`text-white rounded-xl p-3 py-3 text-2xl ${
            status === 1 || msg? "bg-green-500" : "bg-rose-500"
          } 
          ${status !== 0 ? "cursor-not-allowed" : ""}
          ${loading ? "cursor-wait bg-opacity-50" : ""} hover:shadow-square`}
        >
          {status === 0 && !msg && <>Apply</>}
          {status === -1 && <>Rejected</>}
          {(msg && status !== 1 && status !== -1) && <>Applied</>}
          {(status === 1) && <>Hired</>}
        </button>
      </div>
    );
  }
  return (
    <div className="w-full bg-white h-full justify-center shadow-md items-start flex flex-col rounded-3xl p-5 gap-4">
      <div className="font-sans text-2xl font-medium underline underline-offset-4">
        {title}
      </div>
      <div>{data}</div>
    </div>
  );
}
