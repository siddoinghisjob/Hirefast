import React, { useState } from "react";
import Leftside from "../dashboard/components/leftside";
import RightSide from "../dashboard/components/rightside";

function JobOwnerTemplate({ children, rightIndicator, current }) {
  const [right, setRight] = useState(null);
  return (
    <div
      className={`md:grid bg-dashPrime md:h-screen md:overflow-hidden ${
        rightIndicator ? "md:grid-cols-123" : "md:grid-cols-two"
      } flex flex-col min-h-screen justify-between w-full`}
    >
      <div className="w-full h-full">
        <Leftside
          current={current}
          setRight={setRight}
          right={rightIndicator}
        />
      </div>
      {children}
      {rightIndicator && (
        <div className="w-full h-full">
          <RightSide right={right} />
        </div>
      )}
    </div>
  );
}

function JobSeekerTemplate({ children, rightIndicator, current }) {
  const [right, setRight] = useState(null);
  return (
    <div
      className={`md:grid bg-dashPrime md:h-screen md:overflow-hidden ${
        rightIndicator ? "md:grid-cols-123" : "md:grid-cols-two"
      } flex flex-col min-h-screen justify-between w-full`}
    >
      <div className="w-full h-full">
        <Leftside
          current={current}
          setRight={setRight}
          right={rightIndicator}
        />
      </div>
      {children}
      {rightIndicator && (
        <div className="w-full h-full">
          <RightSide right={right} />
        </div>
      )}
    </div>
  );
}

export { JobOwnerTemplate, JobSeekerTemplate };
