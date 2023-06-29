import React from "react";
import { BsPersonFill } from "react-icons/bs";

export default function Loading(props) {
  return (
    <div className="chat h-14 theyChat">
      <div className="msg they">
        <ul className="loadingMsg">
          <li className="relative">.</li>
          <li className="relative">.</li>
          <li className="relative">.</li>
        </ul>
      </div>
      <div className="infoTheyParent">
        <div className="infoThey">
          {props.time && <div className="time">{props.time}</div>}
          <div className="profile">
            {!props.profile && (
              <BsPersonFill className="h-6 w-6 rounded-full bg-[#ddd] text-black p-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
