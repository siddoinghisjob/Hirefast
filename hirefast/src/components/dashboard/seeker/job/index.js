import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Red from "../../owner/boxes/red";
import Yellow from "../../owner/boxes/yellow";

export default function SeekerJob() {
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setError] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [size, setSize] = useState(5);
  const [maxsize, setmaxSize] = useState(0);
  useEffect(() => {
    const helper = async () => {
      setLoader(true);
      try {
        const size = await fetch(process.env.REACT_APP_ORIGIN+"/seeker/joblist/size", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
            "Content-Type": "application/json",
          },
        });
        const results = await size.json();
        if (results?.success) {
          setmaxSize(results?.size);
        } else return;
      } catch (err) {
        setError("Something is wrong. Try to refresh.");
        return;
      } finally {
        setLoader(false);
      }
    };
    helper();
  },[]);
  const handler = () =>{
    if(size+10 > maxsize) return;
    else setSize(size => size + 10);
  }
  useEffect(() => {
    const util = async () => {
      try {
        const list = await fetch(
          process.env.REACT_APP_ORIGIN+"/seeker/joblist?search="+search+"&size=" + size,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              "Access-Control-Allow-Origin":process.env.REACT_APP_ORIGIN,
              "Content-Type": "application/json",
            },
          }
        );
        const res = await list.json();
        if (res.success) {
          const box = res.rows?.map((row) => {
            if (row.status)
              return <Yellow id={row.id} title={row.title} delBool />;
            else return <Red id={row.id} title={row.title} />;
          });
          setBoxes(box);
        } else {
          setError("Something is wrong. Try to refresh.");
        }
      } catch (err) {
        setError("Something is wrong. Try to refresh.");
      }
    };
    util();
  }, [size, search]);

  return (
    <div className="bg-white h-full min-h-screen w-full p-6">
      <div className="text-black flex items-center gap-0">
        <div className="flex justify-center items-center rounded-md h-14 w-14 text-[#6b74f7] bg-[#cddafb]">
          <AiOutlineSearch className="h-9 w-9" />
        </div>
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full h-14 text-xl font-sans rounded-l-none hover:outline-none focus:outline-none hover:shadow-md p-2 rounded-md bg-[#f0f3fc]"
        />
      </div>
      <div className="w-full h-full justify-between flex flex-wrap gap-5 p-10 pb-5">
        {!loader && errors.length <= 0 && boxes?.map((box) => box)}
        {!loader && errors.length > 0 && <div>{errors}</div>}
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
        {!loader && errors.length<= 0 &&
        <div className="h-fit p-5 flex w-full justify-center items-center">
          <button
            onClick={handler}
            className={`bg-rose-500 ${size+10 <= maxsize ? 'cursor-pointer' : 'cursor-not-allowed'} transition-all hover:scale-110 text-white p-5 py-3 text-xl uppercase rounded-2xl font-sans font-semibold`}
          >
            More
          </button>
        </div>}
      </div>
    </div>
  );
}
