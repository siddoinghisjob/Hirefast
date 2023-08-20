import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDataList from "./jobdatalist";

export default function SeekerJobPage() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const type = {
    0: "Remote Only",
    1: "Office Only",
    2: "Hybrid",
  };
  const name = {
    t: "Job Title",
    d: "Description",
    c: "Contact Information",
    a: "Additional Information",
    o: "Perks",
    jt: "Nature of work",
    jr: "Requirements",
    l: "Location",
  };
  const [job, setJob] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setJob((job) => []);
    const util = async () => {
      setLoader(true);
      try {
        const query = await fetch(
          "http://localhost:1000/seeker/joblist/" + id,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
              "Content-Type": "application/json",
            },
          }
        );
        const res = await query.json();
        let itemsList = [];
        if (res.success) {
          for (const key in res?.job) {
            if (res?.job[key]?.length > 0) {
              itemsList = [
                ...itemsList,
                <JobDataList
                  id = {id}
                  title={name[key]}
                  data={key === "jt" ? type[res?.job[key]] : res?.job[key]}
                />,
              ];
            }
          }
          setJob([...job, itemsList]);
        } else {
          setError("Something wrong happened. Try again later.");
        }
      } catch (err) {
        setError("Something wrong happened. Try again later.");
      } finally {
        setLoader(false);
      }
    };
    util();
  }, []);

  return (
    <div className="w-full bg-slate-50 h-full scroll overflow-x-hidden overflow-y-scroll min-h-screen justify-between flex border-0 border-r-2 p-7">
      {loader && (
        <div className="w-full h-full absolute z-50 left-0 top-0 bottom-0 right-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div>
            <img
              src="\assets\images\loading-gif.gif"
              className="h-20 w-20"
              alt="loading"
            />
          </div>
        </div>
      )}
      {!loader && error?.length <= 0 && (
        <div className="flex flex-col relative gap-5 w-full h-full">{job}</div>
      )}
      {!loader && error?.length > 0 && (
        <div className="flex flex-col gap-5">{error}</div>
      )}
    </div>
  );
}
