import React from "react";
import { BsPersonFill } from "react-icons/bs";

export default function Me(props) {
  return (
    <>
      <div className="chat meChat">
        <div className="msg me">
          {!props.chat && (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              expedita laudantium porro tempora ratione possimus ullam quod
              fugit ipsum eius praesentium quae, assumenda voluptate quibusdam
              vel magni nihil. Iste, vero? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quo expedita laudantium porro
              tempora ratione possimus ullam quod fugit ipsum eius praesentium
              quae, assumenda voluptate quibusdam vel magni nihil. Iste, vero?
            </p>
          )}
          {props.chat && props.chat}
        </div>
        {props.time && (
          <div className="infoMeParent">
            <div className="infoMe">
            {props.time && <div className="time">{props.time}</div>}
              <div className="profile">
                {!props.profile && (
                  <BsPersonFill className="h-6 w-6 rounded-full bg-[#ddd] text-black p-1" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
