import React, {useState} from "react";
import Center from "./center";
import Leftside from "../components/leftside";
import RightSide from "../components/rightside";

export default function OwnerDashboard() {
  const [right,setRight] = useState(null);
  return (
      <div className="md:grid bg-dashPrime md:h-screen md:overflow-hidden md:grid-cols-123 flex flex-col min-h-screen justify-between w-full">
        <Leftside current={0} setRight={setRight} right={right}/>
        <Center />
        <RightSide right={right}/>
      </div>
  );
}
