import React, { useEffect, useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Calendar() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const events = [25, 24];

  let dt = new Date();
  const [month, setMonth] = useState(dt.getMonth());
  const [year, setYear] = useState(dt.getFullYear());
  const [current, setCurrent] = useState([]);
  const [lastmonth, setlastmonth] = useState();

  useEffect(
    () => setCurrent([dt.getDate(), dt.getMonth(), dt.getFullYear()]),
    []
  );

  dt.setFullYear(year);
  dt.setMonth(month);
  const daysInMonth = (p) => {
    return new Date(year, month + 1 + p, 0).getDate();
  };
  const dayOfMonth = (p) => {
    return new Date(year, month + 1 + p, 0).getDay();
  };
  let endDate = daysInMonth(0),
    endDay = 6 - dayOfMonth(0),
    prevDay = dayOfMonth(-1) + 1,
    prevDate = daysInMonth(-1);

  useEffect(() => {
    const arr = Array.from(Array(prevDay).keys()).reverse();
    setlastmonth(arr);
  }, [month]);
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg gap-1 p-3 w-full flex flex-col">
        <h1 className="font-bold text-[160%]">Schedule</h1>
        <div className="text-prime border-2 preventCopy rounded-lg flex flex-col h-full w-full">
          <div className="flex bg-[#f0f3fc] rounded-md p-1 rounded-b-none justify-between items-center w-full">
            <div
              onClick={() => {
                setMonth(month > 0 ? month - 1 : 11);
                setYear(month > 0 ? year : year - 1);
              }}
              className="hover:scale-125 transition-all p-2 cursor-pointer"
            >
              <BsFillArrowLeftCircleFill className="h-7 w-7" />
            </div>
            <div className="bg-[#6771fd] text-white p-2 w-fit text-center font-semibold rounded-md">
              {months[month]} {year}
            </div>
            <div
              onClick={() => {
                setMonth(month < 11 ? month + 1 : 0);
                setYear(month < 11 ? year : year + 1);
              }}
              className="hover:scale-125 transition-all p-2 cursor-pointer"
            >
              <BsFillArrowRightCircleFill className="h-7 w-7" />
            </div>
          </div>
          <div className="shadow-inner w-full flex justify-center text-center items-center font-medium flex-col font-sans">
            <div className="grid w-full p-1 grid-cols-7 text-center items-centerborder-b-2 font-bold">
              {weekdays.map((el) => (
                <span className="w-full text-center p-2" key={el.id}>
                  {el}
                </span>
              ))}
            </div>
            <div className="grid w-full p-1 grid-cols-7 text-center items-center">
              {lastmonth?.map((el) => (
                <span
                  key={el.id}
                  className="w-full text-center font-normal p-2 text-gray-500"
                >
                  {prevDate - el}
                </span>
              ))}
              {Array.from(Array(endDate).keys()).map((el) => (
                <span
                  key={el.id}
                  className={`"w-full p-2 flex group flex-col justify-center items-center text-center
                    hover:bg-[#6771fd] hover:text-purple-100
                  transition-all ease-in-out rounded-md ${
                    current[0] === el + 1 &&
                    current[1] === parseInt(month) &&
                    current[2] === parseInt(year)
                      ? " bg-color-1 text-red-100"
                      : ""
                  } relative "`}
                >
                  {el + 1}
                </span>
              ))}
              {Array.from(Array(endDay).keys()).map((el) => (
                <span
                  key={el.id}
                  className="w-full text-center font-normal p-2 text-gray-500"
                >
                  {el + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
