import React from "react";
import Header from "../header";
import Footer from "../footer";

export default function Loader() {
  return (
    <div className="flex flex-col min-h-screen h-full justify-between">
      <Header />
      <section className="h-full w-full flex justify-center items-center">
        <img
          className="bg-white rounded-full p-3 shadow-md animate-pulse"
          src="\assets\images\loading-gif.gif"
          height={100}
          width={100}
          alt={"Loading..."}
        />
      </section>
      <Footer />
    </div>
  );
}
