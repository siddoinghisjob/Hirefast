import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { Context } from "../../../../context";

export default function JobDashBoard() {
  const [main, setMain] = useState(false);
  const [Post, setPost] = useState(2);
  const [visible, setVisible] = useState(false);
  const [Get, setGet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Resumeloading, setResumeLoading] = useState(true);
  const [jobdetails, setJobdetails] = useState(false);
  const context = useContext(Context).state;

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_ORIGIN+"/owner/candidate?jid=" + id, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin":process.env.REACT_APP_ORIGIN,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setGet(res.data);
        } else {
          setGet([]);
        }
      })
      .finally(() => setLoading(false));
    fetch(process.env.REACT_APP_ORIGIN+"owner/job/details?id=" + id, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setJobdetails((jobdetails) => res.rows);
        } else {
          window.location.href = "/owner/dashboard";
        }
      })
      .catch((err) => (window.location.href = "/owner/dashboard"))
      .finally(() => setLoading(false));
  }, []);
  const handlePopup = () => {
    setVisible(!visible);
    setResumeLoading(true);
  };
  const handleActions = (uid, method) => {
    setLoading(true);
    fetch(process.env.REACT_APP_ORIGIN+"owner/candidate", {
      method: "post",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jid: id,
        uid: uid,
        method: method,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPost(1);
        } else {
          setPost(0);
        }
      })
      .catch((err) => setPost(0))
      .finally(() => setLoading(false));
  };
  return (
    <div className="bg-white md:rounded-l-[3rem] p-3 md:pt-7 h-full w-full min-h-screen relative">
      {main && (
        <div className="absolute bg-black bg-opacity-30 z-30 right-0 left-0 top-0 bottom-0"></div>
      )}
      {loading && (
        <div className="absolute flex justify-center items-center h-full w-full bg-black bg-opacity-30 z-30 right-0 left-0 top-0 bottom-0">
          <img
            src="\assets\images\loading-gif.gif"
            className="h-20 w-20"
            alt="loading"
          />
        </div>
      )}
      <div className="w-full font-normal text-gray-600 font-sans flex items-center gap-2">
        <span>
          <Link to="/owner/dashboard">Dashboard</Link>
        </span>
        <span className="text-gray-400 font-serif font-light">&gt;</span>
        <span>
          Job
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:h-28 w-full border-b-2">
        <div className="flex flex-col w-full">
          <span className="text-[200%] w-full font-semibold">
            {jobdetails?.jobtitle}
          </span>
          <span className="text-gray-600 text-[110%]">#{id}</span>
        </div>
      </div>
      <main className="bg-white p-5 w-full h-full">
        {Post === 0 && (
          <div className="text-center  my-2 bg-red-50 border-2 border-rose-500 p-1 rounded-lg text-red-500">
            Error.
          </div>
        )}
        {Post === 1 && (
          <div className="text-center  my-2 bg-green-50 border-2 border-emerald-500 p-1 rounded-lg text-green-500">
            Success.
          </div>
        )}
        <div className="bg-slate-100 overflow-x-auto rounded-2xl shadow-inner">
          <table className="w-full h-full overflow-x-auto">
            <thead className="flex justify-between items-center w-full h-full p-5 py-2">
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Method</th>
            </thead>
            <tbody className="flex flex-col p-2 pt-0">
              {Get?.map((el,key) => (
                <>
                  <tr key = {key} className="flex justify-between bg-white border-2 border-t-0 rounded-lg items-center w-full h-full p-5 py-2">
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td className="border-0 items-center w-full flex">
                      <div className="flex flex-wrap justify-center items-center w-full">
                        <div
                          onClick={handlePopup}
                          className={`"shadow-xl flex items-center justify-center border-2 cursor-pointer hover:shadow-pink-400 rounded-xl px-4 py-2 bg-white"`}
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
                          {Resumeloading && (
                            <div className="w-full transition-all h-full flex items-center justify-center">
                              <img
                                src="\assets\images\loading-gif.gif"
                                className="h-20 w-20"
                                alt="loading"
                              />
                            </div>
                          )}
                          <object
                            data={`"${el?.resume}"`}
                            type="application/pdf"
                            width={"100%"}
                            height={"100%"}
                            onLoad={() => setResumeLoading(false)}
                          >
                            <p>
                              Your web browser doesn't have a PDF plugin.
                              Instead, you can{" "}
                              <a href={el?.resume}>
                                click here to download the pdf
                              </a>
                              .
                            </p>
                          </object>
                        </div>
                      )}
                    </td>
                    {el.inactive === 0 && <td className="flex flex-wrap gap-2 justify-center items-center">
                      <button
                        className="p-2 rounded-xl bg-green-500 text-white"
                        onClick={() => handleActions(el.id, 1)}
                      >
                        Hire
                      </button>
                      <button
                        className="p-2 rounded-xl bg-orange-500 text-white"
                        onClick={() => handleActions(el.id, -1)}
                      >
                        Reject
                      </button>
                    </td>}
                    {el.inactive === 1 && <td className="">
                      Hired
                    </td>}
                    {el.inactive === -1 && <td className="">
                      Rejected
                    </td>}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
